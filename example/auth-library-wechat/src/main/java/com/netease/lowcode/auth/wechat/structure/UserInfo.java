package com.netease.lowcode.auth.wechat.structure;


import com.netease.lowcode.core.annotation.NaslStructure;

/**
 * @author system
 */
@NaslStructure
public class UserInfo {
    /**
     * 用户唯一标识
     */
    public String userId;
    /**
     * 用户名
     */
    public String userName;
    /**
     * 认证来源
     */
    public String source;
    /**
     * 用户的唯一标识
     */
    public String openid;
    /**
     * 用户昵称
     */
    public String nickname;
    /**
     * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
     */
    public Integer sex;
    /**
     * 用户个人资料填写的省份
     */
    public String province;
    /**
     * 普通用户个人资料填写的城市
     */
    public String city;
    /**
     * 国家，如中国为CN
     */
    public String country;
    /**
     * 	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效
     */
    public String headimgurl;
}