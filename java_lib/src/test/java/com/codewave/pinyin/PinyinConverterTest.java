package com.codewave.pinyin;

import com.codewave.pinyin.PinyinConverter;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PinyinConverterTest {

    @Test
    public void testToPinyin() {
        String chinese = "中国";
        String expectedPinyin = "zhongguo";
        assertEquals(expectedPinyin, PinyinConverter.toPinyin(chinese));

        chinese = "你好";
        expectedPinyin = "nihao";
        assertEquals(expectedPinyin, PinyinConverter.toPinyin(chinese));
    }

    @Test
    public void testToFirstLetterPinyin() {
        String chinese = "中华人民共和国";
        String expectedFirstLetterPinyin = "ZHRMGHG";
        assertEquals(expectedFirstLetterPinyin, PinyinConverter.toFirstLetterPinyin(chinese));

        chinese = "你好";
        expectedFirstLetterPinyin = "NH";
        assertEquals(expectedFirstLetterPinyin, PinyinConverter.toFirstLetterPinyin(chinese));
    }
}