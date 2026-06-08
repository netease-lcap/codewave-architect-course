const crypto = require('crypto');
const { get } = require('http');

/**
 * 计算wsSecret校验字符串
 * @param {string} secretKey - 主KEY或备KEY的值
 * @param {string} bucketName - 存储桶名称
 * @param {string} objectKey - 对象键（视频资源路径）
 * @param {string|number} wsTime - 时间戳
 * @returns {string} 32位MD5加密后的wsSecret
 */
function calculateWsSecret(secretKey, bucketName, wsTime) {
    // 按照规则拼接字符串
    const sourceString = `${secretKey}/${bucketName}${wsTime}`;
    console.log(`拼接的字符串: ${sourceString}`);
    // 创建32位MD5哈希
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(sourceString, 'utf-8');

    // 返回十六进制结果（32位）
    return md5Hash.digest('hex');
}

function getBucketName(url) {
    // http://jdvodmrvvfqeg.vod.126.net/jdvodmrvvfqeg/f2ed43a7ce044521ac2916541bd75456.mp4?wsSecret=72bed5c7624e3212bdef934f9dd6e414&wsTime=1756783180
    //输出为jdvodmrvvfqeg/f2ed43a7ce044521ac2916541bd75456.mp4
    const urlObj = new URL(url);
    const pathname = urlObj.pathname; // 获取路径部分
    // 去掉开头的斜杠
    const pathWithoutLeadingSlash = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    // 分割路径，获取bucketName和objectKey
    const firstSlashIndex = pathWithoutLeadingSlash.indexOf('/');
    const bucketName = pathWithoutLeadingSlash.substring(0, firstSlashIndex);
    const objectKey = pathWithoutLeadingSlash.substring(firstSlashIndex + 1);
    return bucketName + '/' + objectKey
}


// 示例参数
// const secretKey = 'f861cf6d9532';
const secretKey = 'bbaa1ba3ac7b4dd08ea554583457855b';

// const bucketName = 'jdvodmrvvfqeg/269f517661a84e7d8dc0e2a7a350de77.mp4';

// const url = 'http://jdvodmrvvfqeg.vod.126.net/jdvodmrvvfqeg/d5c099d82264414bbf092855c2aabc08.mp4?wsSecret=5a4a3456a8c334a4ac0f59632a328c42&wsTime=1756696420';

// 命令行参数获取URL
const url = process.argv[2];

const bucketName = getBucketName(url)


const wsTime = 1991028695;

// 计算wsSecret
const wsSecret = calculateWsSecret(secretKey, bucketName, wsTime);

// 输出结果
console.log(`计算得到的wsSecret: ${wsSecret}`);
console.log(``);
console.log(``);
console.log(`https://jdvodmrvvfqeg.vod.126.net/${bucketName}?wsSecret=${wsSecret}&wsTime=${wsTime}`);


// console.log(getBucketName('http://jdvodmrvvfqeg.vod.126.net/jdvodmrvvfqeg/f2ed43a7ce044521ac2916541bd75456.mp4?wsSecret=72bed5c7624e3212bdef934f9dd6e414&wsTime=1756783180'));

// 注：使用示例参数应输出正确的MD5结果
// http://jdvodmrvvfqeg.vod.126.net/jdvodmrvvfqeg/269f517661a84e7d8dc0e2a7a350de77.mp4?wsSecret=8b5fb56b97b89047c3bec96919c4b587&wsTime=1761028695

// https://doc.yunxin.163.com/vod/server-apis/DM5MzI2OTI?platform=server
// 反查wsSecret的计算规则，确保代码逻辑正确