package ${packageName};

import ${getPackage("com.netease.cloud.archetype")}.config.Constants;
import ${getPackage("com.netease.cloud.archetype")}.config.LcpProperties;
import ${getPackage("com.netease.cloud.archetype")}.context.UserContext;
import ${getPackage("com.netease.cloud.archetype")}.domain.enumeration.ErrorCodeEnum;
import ${getPackage("com.netease.cloud.archetype")}.exception.HttpCodeException;
import ${getPackage("com.netease.cloud.archetype")}.filestorage.FileStorageClient;
import ${getPackage("com.netease.cloud.archetype")}.filestorage.FileStorageClientManager;
import ${getPackage("com.netease.cloud.archetype")}.util.*;
import ${getPackage("com.netease.cloud.archetype")}.web.ApiReturn;
import ${getPackage("com.netease.cloud.archetype")}.web.interceptor.RateLimiterSimpleWindow;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Triple;
import org.owasp.encoder.Encode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 文件上传controller
 * 文件上传和文件下载都存在匹配两个路径规则这是因为历史原因需要兼容，后续全部以/upload前缀匹配，根据httpMeTHod区分上传、下载、删除
 *
 * 文件上传目前支持内置参数
 * lcapPath: 自定义上传路径
 * lcapFsType: 指定目标文件系统
 *
 * 支持内置Header
 * lcap-access: 文件访问权限，支持public和private
 * lcap-ttl: 文件过期设置，double类型
 *
 * @author sys
 * @date 2022-03-10 14:59
 */
@RestController
public class FileUploadController {
    @Resource
    private LcpProperties lcpProperties;
    @Resource
    private ProxyController proxyController;
    @Resource
    private ObjectMapper objectMapper;
    @Resource
    private FileStorageClientManager spiManager;

    @Resource
    private MessageSource messageSource;

    @Value("${r"${upload.base-path}"}")
    private String basePathStr;

    @Value("${r"${file.upload.allowed-types:}"}")
    private String uploadAllowedTypes;

    @Value("${r"${extensions.file_compress_tool.custom.compressArchiveType:7z}"}")
    private String compressArchiveType = "7z";

    @Value("${r"${file.upload.hashFileName:false}"}")
    private Boolean hashFileName;

    @Value("${r"${custom.upload_encryptFileName:false}"}")
    private Boolean encryptFileName;

    @Value("${r"${spring.application.id}"}")
    private String appId;

    private final Logger log = LoggerFactory.getLogger(FileUploadController.class);

    @PostMapping(value = {FileUploadUtils.UPLOAD_API_PATH_PREFIX + "/**", "/gateway/{service}/api/v1/app/upload"})
    public void upload(@RequestBody(required = false) String body,
                       @RequestParam List<MultipartFile> file,
                       @PathVariable(value = "service", required = false) String service,
                       HttpServletRequest request,
                       HttpServletResponse response) throws Exception {

        // 获取上传文件的存储类型
        String fsType = request.getParameter(Constants.UPLOAD_PARAMETER_FS_TYPE);
        fsType = ObjectUtils.defaultIfNull(fsType, lcpProperties.getUpload().getSinkType());

        // 获取上传文件的访问权限
        String access = StringUtils.defaultString(request.getHeader(Constants.UPLOAD_HEADER_ACCESS), Constants.UPLOAD_ACCESS_PUBLIC);

        // 获取CDN加速
        Boolean viaOriginUrl = Boolean.parseBoolean(request.getParameter(Constants.UPLOAD_PARAMETER_FS_VIA_ORIGIN_URL));

        // 获取上传文件的过期时间
        Double ttl = Double.valueOf(StringUtils.defaultString(request.getHeader(Constants.UPLOAD_HEADER_TTL),
                String.valueOf(lcpProperties.getUpload().getTtl() )));

        //附加数据获取的storagePath
        String storagePath = request.getParameter(Constants.UPLOAD_PARAMETER_STORAGE_PATH);

        // 指定要上传的文件路径
        String uploadPath = null;
        // 指定要上传的文件路径 如果storagePath不为空 且通过检验，则取值作为uploadPath最终的文件上传路径
        if (StringUtils.isNotBlank(storagePath)) {
            filterStoragePath(storagePath);
            uploadPath = storagePath;
        } else {
            uploadPath = FileUploadUtils.getUploadPath(request, FileUploadUtils.UPLOAD_API_PATH_PREFIX + "/");
        }

        //文件路径安全过滤
        uploadPathFilter(uploadPath);

        // 获取压缩参数
        Boolean isCompress = Boolean.parseBoolean(request.getParameter(Constants.UPLOAD_PARAMETER_FS_IS_COMPRESS));

        // 获取文件存储客户端
        FileStorageClient fileSystemSpi = spiManager.getFileSystemSpi(fsType);

        // 请求参数中获取 请求路径
        String path = StringUtils.defaultIfBlank(request.getParameter(Constants.UPLOAD_PARAMETER_PATH), "");

        if (null != fileSystemSpi) {
            List<String> filePaths = new ArrayList<>(file.size());
            for (MultipartFile multipartFile : file) {
                try (InputStream inputStream = multipartFile.getInputStream()) {

                    // 获取上传文件名
                    String originalFilename = multipartFile.getOriginalFilename();

                    // 对上传的文件名进行安全校验
                    fileNameFilter(originalFilename);

                    // 文件名安全处理 （防止XSS攻击）
                    String safeFilename = Encode.forHtml(originalFilename);

                    // 文件路径 安全处理 (防止XSS攻击)
                    uploadPath = Encode.forHtml(uploadPath);

                    //对象存储中的文件名需要和返回的不一致
                    Triple<String/*原始文件名称*/, String/*处理过后的文件名*/, String/*处理过后的文件名 + 后缀*/> fileNameTriple =
                            FileUploadUtils.handlerFileName(originalFilename, this.hashFileName, appId, this.encryptFileName);
                    safeFilename = fileNameTriple.getRight();

                    //要进行拼接的文件路径前缀 优先选取上传路径 ,如果没有则选取配置文件路径
                    String prefixFilePath = StringUtils.isNotBlank(uploadPath)? FilenameUtils.concat(lcpProperties.getUpload().getSinkPath(),uploadPath) : lcpProperties.getUpload().getSinkPath();

                    //@since 3.9 默认需要加一级制品的目录
                    prefixFilePath = FilenameUtils.concat(prefixFilePath + File.separator, this.appId);

                    //生成最终存储的文件路径
                    String savePath = FileUploadUtils.generateSavePath(safeFilename, prefixFilePath, access, ttl,viaOriginUrl);

                    // 开启文件压缩功能
                    if (Boolean.TRUE.equals(isCompress) && StringUtils.isNotBlank(compressArchiveType)) {
                        String filePath = compress(inputStream, savePath, fileSystemSpi, request, fsType);
                        filePath = FileUploadUtils.replaceTargetFileSeg(filePath, fileNameTriple.getMiddle(), fileNameTriple.getLeft(), this.encryptFileName);
                        filePaths.add(filePath);
                    } else {
                        // 不开启文件压缩功能
                        String filePath = fileSystemSpi.upload(inputStream, savePath, formatRequestParameters(request));
                        filePath = FileUploadUtils.replaceTargetFileSeg(filePath, fileNameTriple.getMiddle(), fileNameTriple.getLeft(), this.encryptFileName);
                        filePaths.add(filePath);
                    }
                }
            }
            uploadLocalResponse(filePaths, request, response);
        } else {
            throw new HttpCodeException(ErrorCodeEnum.FILESYSTEM_NOT_SUPPORT.code);
        }
    }


    /**
     将输入流压缩为指定格式的文件并上传到文件存储系统。
     @param inputStream 要压缩的输入流。
     @param savePath 文件在文件系统中的保存路径。
     @param fileSystemSpi 文件存储系统客户端。
     @param request HTTP请求对象，包含上传文件相关的参数。
     @param fsType 文件存储类型，用于判断是否需要删除临时文件。
     @return 上传后的文件在文件存储系统中的路径。
     @throws Exception 压缩或上传过程中出现的异常。
     */
    private String compress(InputStream inputStream,String savePath,FileStorageClient fileSystemSpi,HttpServletRequest request,String fsType) throws Exception {
        // 生成临时文件
        File tempFile = inputStreamToFile(inputStream,savePath);
        // 获取到压缩文件
        File compressedFile = createArchive(tempFile);

        try (InputStream compressedInputStream = new FileInputStream(compressedFile)) {
            String uploadFilePath = savePath;
            if (!savePath.contains(compressedFile.getName())) {
                uploadFilePath += '.' + compressArchiveType;
            }
            String filePath = fileSystemSpi.upload(compressedInputStream, uploadFilePath, formatRequestParameters(request));
            return filePath;
        }
        finally {
            if (compressedFile != null && compressedFile.isFile() && !Constants.UPLOAD_TYPE_LOCAL.equalsIgnoreCase(fsType)) {
                compressedFile.delete();
            }
            // 关闭临时文件的流和删除临时文件
            if (tempFile != null && tempFile.isFile()) {
                Files.delete(tempFile.toPath());
            }
        }
    }

    /**
     将输入流写入文件
     @param inputStream 输入流
     @param targetPath 目标文件路径
     @return 写入的目标文件
     @throws IOException 写入文件时可能抛出IOException异常
     */
    public File inputStreamToFile(InputStream inputStream, String targetPath) throws IOException {
        File targetFile = new File(targetPath);
        targetFile.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(targetFile)) {
            IOUtils.copy(inputStream, outputStream);
            outputStream.flush();
        }
        return targetFile;
    }

    /**

     创建压缩文件
     *
     @param file 待压缩的文件
     @return 压缩后的文件
     @throws Exception 创建压缩文件时可能抛出的异常
     */
    private File createArchive(File file) throws Exception {

        File compressedFile = file;
        try {
            // 获取指定beanName对应的bean
            Object bean = SpringUtils.getBean("fileCompressTool");
            if (bean != null) {
                // 获取方法名
                String methodName = "createArchive";
                // 获取方法参数类型
                Class<?>[] parameterTypes = new Class<?>[]{File.class};
                // 获取方法
                Method method = bean.getClass().getMethod(methodName, parameterTypes);
                if (method != null) {
                    // 调用方法
                    Object result = method.invoke(bean, file);
                    if (result instanceof File) {
                        compressedFile = (File) result;
                        return compressedFile;
                    }
                }
            }
        } catch (Exception e) {
            log.error("创建压缩文件时发生错误:", e);
        }
        return compressedFile;
    }

    /**
     对上传路径进行合法性过滤，判断上传路径是否符合规范
     *
     @param uploadPath 待过滤的上传路径
     @throws HttpCodeException 如果上传路径不合法，则抛出HttpCodeException异常，返回对应的错误提示
     */
    //文件路径安全过滤
    private void uploadPathFilter(String uploadPath) {
        if(StringUtils.isNotBlank(uploadPath)) {
            Pattern pattern = Pattern.compile("^[a-zA-Z0-9_/-]*$");
            Matcher matcher = pattern.matcher(uploadPath);
            if (!matcher.matches()) {
                // 路径不合法，抛出异常或返回错误提示
                throw new HttpCodeException(HttpStatus.NOT_FOUND.value(),ErrorCodeEnum.FILEPATH_NOT_ALLOWED.desc);
            }

            // 对上传路径进行合法性校验
            String[] pathSegs = uploadPath.split("/");
            for (String seg : pathSegs) {
                if (seg.equals("..")) {
                    throw new HttpCodeException(ErrorCodeEnum.FILEPATH_NOT_ALLOWED.desc);
                }
                if (seg.equals(".")) {
                    throw new HttpCodeException(ErrorCodeEnum.FILEPATH_NOT_ALLOWED.desc);
                }
            }

            // 限制上传路径的长度
            if (pathSegs.length > 255) {
                throw new HttpCodeException(ErrorCodeEnum.FILEPATH_TOO_LONG.desc);
            }
        }
    }

    /**
     * 对上传文件路径进行过滤和校验，确保文件路径合法
     *
     * @param storagePath 上传文件的存储路径
     * @throws HttpCodeException 如果文件路径不符合要求，抛出异常
     *                           - 如果文件名长度超过255个字符，抛出文件名过长异常
     *                           - 如果文件名包含不允许的字符（包括 / \ : * ? " < > | 中文 等非 ASCII 字符），抛出文件名不允许异常
     */
    private void filterStoragePath(String storagePath) {
        // 对上传文件路径的长度进行限制 Linux和Unix系统下的文件名最大长度是255个字符
        if (StringUtils.isBlank(storagePath)){
            return;
        }

        if (storagePath.length() > 255) {
            throw new HttpCodeException(ErrorCodeEnum.FILENAME_TOO_LONG.desc);
        }

        //校验文件路径是否符合要求 不允许出现 / \ : * ? " < > | 中文 等非 ASCII 字符
        if (storagePath.matches("[/\\\\:*?\"<>|']") || storagePath.matches("[^\\x00-\\x7F]+")) {
            throw new HttpCodeException(ErrorCodeEnum.FILENAME_NOT_ALLOWED.desc);
        }
    }

    /**
     对上传的文件名进行合法性过滤，判断文件名是否符合规范
     *
     @param originalFilename 待过滤的上传文件名
     */
    private void fileNameFilter(String originalFilename) {
        // 对上传文件名的长度进行限制 Linux和Unix系统下的文件名最大长度是255个字符
        if (originalFilename != null && originalFilename.length() > 255) {
            throw new HttpCodeException(ErrorCodeEnum.FILENAME_TOO_LONG.desc);
        }

        // 校验文件名是否符合要求
        if (!FilenameUtils.getName(originalFilename).matches("^[^;:><\\/\\\\*%]+(\\.[a-zA-Z0-9]+)?$")) {
            throw new HttpCodeException(ErrorCodeEnum.FILENAME_NOT_ALLOWED.desc);
        }

        // 根据文件名后缀来判断文件类型是否允许上传
        String suffix = StringUtils.substringAfterLast(originalFilename, ".");
        if (StringUtils.isNotBlank(uploadAllowedTypes)) {
            List<String> allowedTypes = Arrays.asList(uploadAllowedTypes.split(";"));
            boolean isAllowed = allowedTypes.stream()
                    .map(String::trim)
                    .anyMatch(type -> suffix.equalsIgnoreCase(type));
            if (!isAllowed) {
                throw new HttpCodeException(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(),ErrorCodeEnum.FILE_TYPE_NOT_ALLOWED.desc);
            }
        }
    }

    private Map<String, String> formatRequestParameters(HttpServletRequest request) {
        if (CollectionUtils.isEmpty(request.getParameterMap())) {
            return new HashMap<>();
        }

        Map<String, String> result = new HashMap<>();
        for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
            if (null != entry.getValue()) {
                result.put(entry.getKey(), String.join(",", entry.getValue()));
            } else {
                result.put(entry.getKey(), null);
            }
        }

        return result;
    }

    private void uploadLocalResponse(List<String> paths, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String fsType = request.getParameter(Constants.UPLOAD_PARAMETER_FS_TYPE);
        List<String> formattedPathResults = new ArrayList<>(paths.size());
        //相对路径
        List<String> relativePathResults = new ArrayList<>(paths.size());
        Map<String,String> pathToRelativePathMap = new HashMap<>();
        for (String path : paths) {
            if (!DomainUtil.matchSupportHttpProtocolPrefix(path)) {
                path = path.startsWith(File.separator) ? path.substring(1) : path;
                String fileDownloadPath;
                String relativePath;
                if (StringUtils.isEmpty(request.getContextPath())) {
                    fileDownloadPath = fileDownloadPathFromRequest(request, path);
                    relativePath = FilenameUtils.concat("/upload/${myPrefix}", path);
                } else if(isDownloadPathFromContextPath(request)){
                    // contextPath 写全路径 携带Http https 协议的情况，这种情况不需要再拼接协议等信息
                    fileDownloadPath = String.join("/", request.getContextPath(),
                            FileUploadUtils.UPLOAD_API_PATH_PREFIX, path);
                    relativePath = fileDownloadPath;
                } else {
                    //剩余情况 用当前域名进行拼接
                    String protocol = request.getScheme(); // 获取协议
                    String serverName = request.getServerName(); // 获取域名或IP
                    int serverPort = request.getServerPort(); // 获取端口号
                    String contextPath = request.getContextPath(); // 获取上下文路径

                    // 拼接文件下载路径
                    fileDownloadPath = String.format("%s://%s:%d%s%s/%s", protocol, serverName, serverPort, contextPath, FileUploadUtils.UPLOAD_API_PATH_PREFIX, path);
                    relativePath = contextPath + FilenameUtils.concat(FileUploadUtils.UPLOAD_API_PATH_PREFIX, path);
                }


                fileDownloadPath = appendFsTypeResponse(fileDownloadPath, fsType);

                fileDownloadPath = FileUploadUtils.convertToUnifiedPath(fileDownloadPath);
                relativePath = FileUploadUtils.convertToUnifiedPath(relativePath);

                formattedPathResults.add(fileDownloadPath);
                relativePathResults.add(relativePath);
                pathToRelativePathMap.put(fileDownloadPath,relativePath);
            } else {
                path = FileUploadUtils.convertToUnifiedPath(path);
                formattedPathResults.add(path);
            }
        }

        Object result = null;
        String userId = null == UserContext.getCurrentUser() ? "" : UserContext.getCurrentUser().getUserId();
        if (formattedPathResults.size() == 1) {
            // 单文件返回string，这里兼容老实现
            result = new UploadResult(formattedPathResults.get(0),pathToRelativePathMap.get(formattedPathResults.get(0)));
            log.info("制品: {}, 用户: {}, 上传文件: {}", this.appId, userId, ((UploadResult)result).getResult());
        } else {
            result = new BatchUploadResult(formattedPathResults,relativePathResults);
            log.info("制品: {}, 用户: {}, 上传文件: {}", this.appId, userId, JacksonUtils.toJson(((BatchUploadResult)result).getResult()));
        }



        response.setContentType("application/json;charset=UTF-8");
        IOUtils.write(objectMapper.writeValueAsBytes(result), response.getOutputStream());
    }

    private boolean isDownloadPathFromRequest(HttpServletRequest request) {
        return StringUtils.isEmpty(request.getContextPath()) && !NetWorkUtils.isLocalHost(request.getServerName());
    }

    private boolean isDownloadPathFromContextPath(HttpServletRequest request) {
        return !StringUtils.isEmpty(request.getContextPath()) &&
                ( request.getContextPath().startsWith("http") || request.getContextPath().startsWith("https") );
    }

    private String appendFsTypeResponse(String fileDownloadPath, String fsType) {
        if (!StringUtils.isEmpty(fsType)) {
            return fileDownloadPath.indexOf('?') >= 0 ?
                    fileDownloadPath + "&" + Constants.UPLOAD_PARAMETER_FS_TYPE + "=" + fsType :
                    fileDownloadPath + "?" + Constants.UPLOAD_PARAMETER_FS_TYPE + "=" + fsType;
        }

        return fileDownloadPath;
    }

    private String fileDownloadPathFromRequest(HttpServletRequest request, String path) {
        return ( request.getScheme() + "://" + request.getServerName() +
                ( Constants.HTTP_DEFAULT_PORT == request.getServerPort() ? "" : ":" + request.getServerPort() ) +
                FilenameUtils.concat(FileUploadUtils.UPLOAD_API_PATH_PREFIX, path) );
    }

    /**
     * request for downloading upload file
     * @param response
     */
    @GetMapping(value = {FileUploadUtils.UPLOAD_API_PATH_PREFIX + "/**", "/download/**"})
    public void download(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        // 获取上传文件的存储类型
        String fsType = request.getParameter(Constants.UPLOAD_PARAMETER_FS_TYPE);
        fsType = StringUtils.defaultIfBlank(fsType, lcpProperties.getUpload().getSinkType());

        // 获取文件存储客户端
        FileStorageClient fileSystemSpi = spiManager.getFileSystemSpi(fsType);

        if (null == fileSystemSpi) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return;
        }

        // 获取文件下载路径
        String path = getPathByRequest(request);

        // 获取文件名并进行安全处理
        String fileName = request.getParameter(Constants.UPLOAD_PARAMETER_FILENAME);
        fileName = StringUtils.defaultIfBlank(fileName, FilenameUtils.getName(path));

        // 判断文件名是否为空或包含 ".."，如果是，则返回错误
        if (StringUtils.isBlank(fileName) || fileName.contains("..")) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            throw new HttpCodeException(ErrorCodeEnum.FILEPATH_NOT_ALLOWED.desc);
        }

        // 对文件路径进行安全处理
        String safePath = Encode.forHtml(path);
        if(StringUtils.isBlank(safePath) && (safePath.contains("../") || safePath.contains("./"))) {
            throw new HttpCodeException(ErrorCodeEnum.FILEPATH_NOT_ALLOWED.desc);
        }

        // 判断文件路径是否在白名单内
        String basePathStr = lcpProperties.getUpload().getSinkPath();
        if (StringUtils.isNotBlank(basePathStr)) {
            while (basePathStr.startsWith("/")) {
                basePathStr =  basePathStr.substring(1);
            }

            Path basePath = Paths.get(basePathStr).normalize().toAbsolutePath();
            Path otherPath = Paths.get(safePath).normalize().toAbsolutePath();

            Path relativePath = basePath.relativize(otherPath);
            if (relativePath.isAbsolute() || relativePath.toString().startsWith("..")) {
                throw new HttpCodeException("非法的文件路径");
            }
        }

        // 设置响应头
        response.setContentType(FileUploadUtils.getFileMimeType(fileName));
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,"filename=" +
                URLEncoder.encode(fileName, request.getCharacterEncoding()));

        try {
            // 下载文件 采用安全文件路径
            Map<String, String> urlParams = formatRequestParameters(request);
            urlParams.put(FileStorageClient.SINGLE_DOWNLOAD, String.valueOf(true));
            //处理一下加密过后的文件名
            safePath = FileUploadUtils.handlerEncryptFilePath(safePath, urlParams);
            fileSystemSpi.download(response.getOutputStream(), safePath, urlParams);
        } catch (Exception e) {
            throw new HttpCodeException(HttpStatus.INTERNAL_SERVER_ERROR.value(), e);
        }
    }

    public String getPathByRequest(HttpServletRequest request) throws UnsupportedEncodingException {
        String contextPath = request.getContextPath();
        String path = URLDecoder.decode(request.getRequestURI(), "UTF-8");
        path = path.replaceAll("/{2,}", "/");
        String prefix = contextPath + FileUploadUtils.UPLOAD_API_PATH_PREFIX;
        path = path.startsWith(prefix) ? path.substring(prefix.length()) : path;
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        return path;
    }

    /**
     * request for deleting upload file
     * @param response
     */
    @DeleteMapping(value = {FileUploadUtils.UPLOAD_API_PATH_PREFIX + "/**"})
    public ApiReturn<Boolean> delete(HttpServletRequest request, HttpServletResponse response) {

        String fsType = request.getParameter(Constants.UPLOAD_PARAMETER_FS_TYPE);
        fsType = StringUtils.defaultIfBlank(fsType, lcpProperties.getUpload().getSinkType());
        FileStorageClient fileSystemSpi = spiManager.getFileSystemSpi(fsType);

        if (null == fileSystemSpi) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return ApiReturn.of(false);
        }

        String path = request.getServletPath().substring(FileUploadUtils.UPLOAD_API_PATH_PREFIX.length());
        try {
            fileSystemSpi.delete(path, formatRequestParameters(request));
            return ApiReturn.of(true);
        } catch (IOException e) {
            throw new HttpCodeException(HttpStatus.INTERNAL_SERVER_ERROR.value(), e);
        }
    }


    /**
     * 单文件下载、或多文件打包压缩下载
     * @param downloadFile
     */
    @PostMapping("/upload/download_files")
    public void downloadFiles(@RequestBody DownloadFile downloadFile,
                              HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (!RateLimiterSimpleWindow.tryAcquire()) {
            log.info("current request is limited");
            return;
        }

        if (isDownloadNoneFiles(downloadFile)) {
            return;
        }
        List<String> urls = downloadFile.getUrls();
        for (String url : urls) {
            boolean isLocalDomainUrl = DomainUtil.isLocalDomain(url, request);
            if (isLocalDomainUrl && hasNoDownloadPermission(url)) {
                processNotLoginResponse(response);
                return;
            }
        }

        String attachmentName = "";
        if (urls.size() == 1) {
            // 单文件下载
            if (StringUtils.isBlank(urls.get(0))) {
                return;
            }
            attachmentName = FileUploadUtils.getFileName(urls.get(0), downloadFile.getFileName());
            // solved the problem of whitespace being converted to +
            String encodeName = URLEncoder.encode(attachmentName, request.getCharacterEncoding()).replace("+", "%20");
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + encodeName);
            Map<String, String> urlParams = new HashMap<>();
            urlParams.put(FileStorageClient.SINGLE_DOWNLOAD, String.valueOf(true));
            downloadUrl(urls.get(0), response.getOutputStream(), urlParams);
        } else {
            // 多文件处理
            attachmentName = FileUploadUtils.getCompressName(downloadFile.getFileName()) + FileUploadUtils.ZIP_FILE_SUFFIX;
            // solved the problem of whitespace being converted to +
            String encodeName = URLEncoder.encode(attachmentName, request.getCharacterEncoding()).replace("+", "%20");
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + encodeName);
            Map<String, Integer> compressEntryNameMap = new HashMap<>(urls.size());
            try (ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream())) {
                for (String url : urls) {
                    if (StringUtils.isBlank(url)) {
                        // 不处理空的url
                        continue;
                    }
                    String compressEntryName = FileUploadUtils.getCompressEntryName(url, compressEntryNameMap);
                    zipOutputStream.putNextEntry(new ZipEntry(compressEntryName));
                    downloadUrl(url, zipOutputStream, new HashMap<>());
                    zipOutputStream.closeEntry();
                }
            }
        }
    }

    private boolean isDownloadNoneFiles(DownloadFile downloadFile) {
        return null == downloadFile || CollectionUtils.isEmpty(downloadFile.getUrls());
    }

    class UploadResult {
        private int code = 200;
        private boolean success = true;
        private String msg = "success";
        private String result;

        //相对路径
        private String filePath;

        public UploadResult() {}
        public UploadResult(String result) {
            this.result = result;
        }

        public UploadResult(String result,String filePath) {
            this.result = result;
            this.filePath = filePath;
        }

        public String getFilePath() {return filePath;}

        public void setFilePath(String filePath) {this.filePath = filePath;}

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

        public String getResult() {
            return result;
        }

        public void setResult(String result) {
            this.result = result;
        }
    }

    static class DownloadFile {

        private List<String> urls;

        private String fileName;

        public List<String> getUrls() {
            return urls;
        }

        public void setUrls(List<String> urls) {
            this.urls = urls;
        }

        public String getFileName() {
            return fileName;
        }

        public void setFileName(String fileName) {
            this.fileName = fileName;
        }
    }

    private boolean hasNoDownloadPermission(String url) {
        // 1、访问上传的文件，如果文件是需要登录才能访问的则需要鉴权
        // 2、访问上传的文件，如果文件已过期则不允许访问
        return (FileUploadUtils.shouldAccessControl(url) && Objects.isNull(UserContext.getCurrentUserInfo())) ||
                FileUploadUtils.isPathExpiration(url);
    }

    private void processNotLoginResponse(HttpServletResponse response) throws IOException {
        response.setContentType(Constants.AUTH_FILTER_HEADER_CONTENT_TYPE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        ApiReturn<Object> apiReturn = ApiReturn.of("", HttpStatus.UNAUTHORIZED.value(),
                messageSource.getMessage(ErrorCodeEnum.NO_PERMISSION_ACCESS_RESOURCE.code,
                        null, ErrorCodeEnum.NO_PERMISSION_ACCESS_RESOURCE.code, LocaleContextHolder.getLocale()));
        response.getWriter().write(objectMapper.writeValueAsString(apiReturn));
    }

    private void downloadUrl(String url, OutputStream outputStream, Map<String, String> urlParams) throws Exception {
        url = convertToUnifiedPath(url);
        URL urlFile = new URL(url);
        boolean isLocalDomain = DomainUtil.isLocalDomain(url);
        if (isLocalDomain && FileUploadUtils.isUploadApiPath(urlFile.getPath(), "GET")) {
            urlParams.putAll(DomainUtil.getUrlQueryAsMap(url));
            String fsType = urlParams.get(Constants.UPLOAD_PARAMETER_FS_TYPE);
            fsType = StringUtils.defaultIfBlank(fsType, lcpProperties.getUpload().getSinkType());
            FileStorageClient fileSystemSpi = spiManager.getFileSystemSpi(fsType);

            String path = urlFile.getPath();
            path = dealPath(path);
            //处理一下加密过后的文件名
            path = FileUploadUtils.handlerEncryptFilePath(path, urlParams);
            fileSystemSpi.download(outputStream, path, urlParams);
        } else {
            try (InputStream inputStream = urlFile.openStream()) {
                IOUtils.copy(inputStream, outputStream);
            }
        }
    }

    public static String convertToUnifiedPath(String url) {
        String path = url.replaceAll("\\\\", "/"); // 将Windows路径分隔符替换为Linux路径分隔符
        return path;
    }

    public String dealPath(String path){
        path = path.replaceAll("/{2,}", "/");
        path = path.startsWith("/download") ? path.substring("/download".length()) :
                path.substring(path.indexOf(FileUploadUtils.UPLOAD_API_PATH_PREFIX) + FileUploadUtils.UPLOAD_API_PATH_PREFIX.length());
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        return path;
    }

    class BatchUploadResult {
        private int code = 200;
        private boolean success = true;
        private String msg = "success";
        private List<String> result;

        public List<String> getFilePath() {
            return filePath;
        }

        public void setFilePath(List<String> filePath) {
            this.filePath = filePath;
        }

        private List<String> filePath;

        public BatchUploadResult() {}
        public BatchUploadResult(List<String> result) {
            this.result = result;
        }

        public BatchUploadResult(List<String> result,List<String> filePath) {
            this.result = result;
            this.filePath = filePath;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

        public List<String> getResult() {
            return result;
        }

        public void setResult(List<String> result) {
            this.result = result;
        }
    }
}
