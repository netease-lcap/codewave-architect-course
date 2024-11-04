package com.codewave.logic;

import org.testng.annotations.Test;

public class MyLogicTest {

    @Test
    public void testAdd() {
        int result = MyLogic.add(5, 3);
        assert result == 8;
        // assertEquals(result, 8);
    }

    @Test
    public void testGetStructure() {
        MyStructure myStructure = new MyStructure();
        myStructure.name = "myName";
        myStructure.num = 666;
        MyStructure result = MyLogic.getStructure(myStructure);
        assert result.name == "myName";
        assert result.num == 666;
    }

    @Test
    public void testThrowMyException() {
        try {
            MyLogic.throwMyException(-1);
        } catch (MyException e) {
            // 捕获到异常，测试通过
            return;
        }
        // 如果没有捕获到异常，则测试失败
        throw new AssertionError("MyMessage");

    }

}
