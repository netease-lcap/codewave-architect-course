import '@nasl/types';
import { pp } from "@popo-bridge/web"

/**
 * @NaslLogic
 * @type both
 * @title 测试pp接口可用性
 * @desc 测试是否可以调用对应的pp接口
 * @param apiName api名称
 * @returns 返回布尔值
 */
export async function canIUse(apiName: nasl.core.String): Promise<nasl.core.Boolean> {
    try {
        return await pp.canIUse(apiName);
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * @NaslLogic
 * @type both
 * @title 显示系统消息提示框
 * @desc 显示系统消息提示框，用以提供成功、警告和错误等反馈信息。
 * @param title 提示框的内容
 * @param durationType 持续时间：1-2s；2-3.5s
 * @returns 返回布尔值
 */
export async function showToast(title: nasl.core.String, durationType: nasl.core.Integer = 1): Promise<nasl.core.Boolean> {
    try {
        // 显示一个持续时间较长的 Toast
        return await pp.showToast({ title, durationType });
    } catch (err) {
        console.error(err);
        // catch or throw, this is a question
        return false;
    }
}

/**
 * @NaslLogic
 * @type both
 * @title 打开 POPO H5 应用
 * @desc //打开 POPO H5 应用
 * @param arg 形如：{ id: nasl.core.String, currentUrl: nasl.core.String }
 * @returns 返回布尔值
 */
export async function navigateToH5(arg: { id: nasl.core.String, currentUrl: nasl.core.String }): Promise<nasl.core.Boolean> {
    try {
        return pp.navigateToH5(arg);
    } catch (err) {
        console.error(err);
        // catch or throw, this is a question
        return false;
    }
}

/**
 * @NaslLogic
 * @type both
 * @title 复制文本到剪贴板
 * @param text 要复制的文本
 * @param callback 回调函数，可选参数，用于接收复制结果以及后续的操作
 * @returns 返回布尔值
 */
export async function copyText(text: nasl.core.String, complete: (success: nasl.core.Boolean) => Promise<void>): Promise<nasl.core.Boolean> {
    // 创建一个临时的textarea元素
    const textArea = document.createElement("textarea");
    // 将其设置为不可见
    textArea.style.position = "fixed";
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    // 设置其值为要复制的文本
    textArea.value = text;
    // 将其添加到页面
    document.body.appendChild(textArea);
    // 选中该textarea中的内容
    textArea.select();
    try {
        // 执行复制命令
        const success = document.execCommand("copy");
        complete && complete(success);
        return success;
    } catch (err) {
        // 复制失败
        complete && complete(false);
        console.error("复制失败：", err);
        return false;
    } finally {
        // 移除临时textarea
        document.body.removeChild(textArea);
    }
}
