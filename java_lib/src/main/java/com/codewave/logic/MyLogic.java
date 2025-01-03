package com.codewave.logic;

import com.netease.lowcode.core.annotation.NaslLogic;

/**
 * Hello world!
 *
 */
public class MyLogic {
    /**
     * 示例逻辑：相加
     * 
     * @param a
     * @param b
     * @return
     */
    @NaslLogic
    public static Integer add(Integer a, Integer b) {
        return a + b;
    }

    @NaslLogic
    public static MyStructure getStructure(MyStructure myStructure) {
        return myStructure;
    }

    @NaslLogic
    // @NaslLogic(enhance = false)
    public static String throwMyException(Integer value)
            throws MyException {
        if (value < 0) {
            throw new MyException("");
        }
        return "";
    }

}
