package com.codewave.pinyin;

import com.netease.lowcode.core.annotation.NaslLogic;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;


public class PinyinConverter {

    /**
     * 将汉字转换为拼音（全拼，小写，不带声调）
     *
     * @param chineseCharacters 要转换的汉字字符串
     * @return 拼音字符串
     */
    @NaslLogic
    public static String toPinyin(String chineseCharacters) {
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        StringBuilder pinyin = new StringBuilder();
        char[] charArray = chineseCharacters.toCharArray();
        for (char c : charArray) {
            try {
                if (Character.toString(c).matches("[\\u4e00-\\u9fff]")) {
                    String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c, format);
                    if (pinyinArray!= null && pinyinArray.length > 0) {
                        pinyin.append(pinyinArray[0]);
                    }
                } else {
                    pinyin.append(c);
                }
            } catch (BadHanyuPinyinOutputFormatCombination e) {
                e.printStackTrace();
            }
        }
        return pinyin.toString();
    }

    /**
     * 将汉字转换为拼音首字母（大写）
     *
     * @param chineseCharacters 要转换的汉字字符串
     * @return 拼音首字母字符串
     */
    @NaslLogic
    public static String toFirstLetterPinyin(String chineseCharacters) {
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        StringBuilder firstLetterPinyin = new StringBuilder();
        char[] charArray = chineseCharacters.toCharArray();
        for (char c : charArray) {
            try {
                if (Character.toString(c).matches("[\\u4e00-\\u9fff]")) {
                    String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c, format);
                    if (pinyinArray!= null && pinyinArray.length > 0) {
                        firstLetterPinyin.append(pinyinArray[0].charAt(0));
                    }
                } else {
                    firstLetterPinyin.append(c);
                }
            } catch (BadHanyuPinyinOutputFormatCombination e) {
                e.printStackTrace();
            }
        }
        return firstLetterPinyin.toString();
    }
}