const crypto = require('crypto');

/**
 * 计算wsSecret校验字符串
 * @param {string} secretKey - 主KEY或备KEY的值
 * @param {string} bucketName - 存储桶名称
 * @param {string} objectKey - 对象键（视频资源路径）
 * @param {string|number} wsTime - 时间戳
 * @returns {string} 32位MD5加密后的wsSecret
 */
function calculateWsSecret(secretKey, bucketName, objectKey, wsTime) {
    // 按照规则拼接字符串
    const sourceString = `${secretKey}/${bucketName}${wsTime}`;

    // 创建32位MD5哈希
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(sourceString);

    // 返回十六进制结果（32位）
    return md5Hash.digest('hex');
}

// 示例参数
const secretKey = 'f861cf6d9532';
const bucketName = 'jdvodmrvvfqeg/f2ed43a7ce044521ac2916541bd75456.mp4';
const wsTime = 1756783180;

// 计算wsSecret
const wsSecret = calculateWsSecret(secretKey, bucketName, wsTime);

// 输出结果
console.log(`计算得到的wsSecret: ${wsSecret}`);

// 注：使用示例参数应输出正确的MD5结果
