package com.netease.lowcode.auth.wechat.structure;


/**
 * @author system
 */
public class Result {

    public static final Integer SUCCESS = 0;
    public static final Integer FAIL = -1;


    /**
     * 成功为0
     * 失败为-1
     */
    public Integer code;
    /**
     * 错误信息
     */
    public String msg;


    public static Result ofFail(String msg) {
        Result result = new Result();
        result.code = FAIL;
        result.msg = msg;
        return result;
    }

    public static Result ofSuccess() {
        Result result = new Result();
        result.code = SUCCESS;
        result.msg = "success";
        return result;
    }
}
