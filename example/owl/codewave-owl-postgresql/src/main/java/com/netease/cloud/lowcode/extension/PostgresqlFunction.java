package com.netease.cloud.lowcode.extension;

import com.netease.cloud.lowcode.owl.spi.rdb.utils.PluginUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostgresqlFunction {
    private PostgresqlFunction() {
    }

    // 目前支持的函数对应关系，Postgresql 和 MySQL 函数不完全一致
    protected static final Map<String, String> FUNCTION_MAP = new HashMap<>();
    static {
        FUNCTION_MAP.put("NOW", "CURRENT_TIMESTAMP");
        FUNCTION_MAP.put("COALESCE", "COALESCE(%s)");
        FUNCTION_MAP.put("GROUP_CONCAT", "STRING_AGG(%s)");
        FUNCTION_MAP.put("ASCII", "ASCII(%s)");
        FUNCTION_MAP.put("LENGTH", "LENGTH(%s)");
        FUNCTION_MAP.put("CHAR_LENGTH", "CHAR_LENGTH(%s)");
        FUNCTION_MAP.put("DATE", "DATE(%s)");
        FUNCTION_MAP.put("YEAR", "EXTRACT(YEAR FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("MONTH", "EXTRACT(MONTH FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("DAY", "EXTRACT(DAY FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("WEEK", "EXTRACT(WEEK FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("HOUR", "EXTRACT(HOUR FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("MINUTE", "EXTRACT(MINUTE FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("SECOND", "EXTRACT(SECOND FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("QUARTER", "EXTRACT(QUARTER FROM CAST(%s AS TIMESTAMP))");
        FUNCTION_MAP.put("LOWER", "LOWER(%s)");
        FUNCTION_MAP.put("UPPER", "UPPER(%s)");
        FUNCTION_MAP.put("TO_DAYS", "DATE(%s) - DATE('0001-01-01') + 366");
        FUNCTION_MAP.put("MAX", "MAX(%s)");
        FUNCTION_MAP.put("MIN", "MIN(%s)");
        FUNCTION_MAP.put("COUNT", "COUNT(%s)");
        FUNCTION_MAP.put("SUM", "SUM(%s)");
        FUNCTION_MAP.put("AVG", "AVG(%s)");
        FUNCTION_MAP.put("IFNULL", "COALESCE(%s,%s)");
        FUNCTION_MAP.put("DATE_ADD", "DATE(%s) + INTERVAL '%s %s'");
        FUNCTION_MAP.put("DATE_SUB", "DATE(%s) - INTERVAL '%s %s'");
        FUNCTION_MAP.put("LEFT", "LEFT(%s,%s)");
        FUNCTION_MAP.put("RIGHT", "RIGHT(%s,%s)");
        FUNCTION_MAP.put("ROUND", "ROUND(cast(%s as numeric),%s)");
        FUNCTION_MAP.put("TRUNCATE", "TRUNC(%s,%s)");
        FUNCTION_MAP.put("IF", "CASE WHEN %s THEN %s ELSE %s END");
        FUNCTION_MAP.put("SUBSTR", "SUBSTRING(%s,%s,%s)");
        FUNCTION_MAP.put("REPLACE", "REPLACE(%s,%s,%s)");
        // INSTR函数位置交换，第一个参数是要查找的字符串，第二个参数是指定的字符串
        FUNCTION_MAP.put("INSTR", "POSITION(%s IN %s)");
        FUNCTION_MAP.put("DATE_FORMAT", "TO_CHAR(%s,%s)");
        FUNCTION_MAP.put("STR_TO_DATE", "TO_TIMESTAMP(%s,%s)");
    }

    // 时间格式对应关系，Postgresql 和 MySQL 函数不完全一致
    protected static final Map<String, String> DATE_FORMAT_MAP = new HashMap<>();
    static {
        DATE_FORMAT_MAP.put("%b", "Mon");
        DATE_FORMAT_MAP.put("%c", "MM");
        DATE_FORMAT_MAP.put("%d", "DD");
        DATE_FORMAT_MAP.put("%e", "DD");
        DATE_FORMAT_MAP.put("%f", "MS");
        DATE_FORMAT_MAP.put("%H", "HH24");
        DATE_FORMAT_MAP.put("%h", "HH12");
        DATE_FORMAT_MAP.put("%I", "HH12");
        DATE_FORMAT_MAP.put("%i", "MI");
        DATE_FORMAT_MAP.put("%j", "DDD");
        DATE_FORMAT_MAP.put("%k", "HH24");
        DATE_FORMAT_MAP.put("%l", "HH12");
        DATE_FORMAT_MAP.put("%M", "Month");
        DATE_FORMAT_MAP.put("%m", "MM");
        DATE_FORMAT_MAP.put("%S", "SS");
        DATE_FORMAT_MAP.put("%s", "SS");
        DATE_FORMAT_MAP.put("%T", "HH24:MI:SS");
        DATE_FORMAT_MAP.put("%U", "WW");
        DATE_FORMAT_MAP.put("%u", "WW");
        DATE_FORMAT_MAP.put("%V", "WW");
        DATE_FORMAT_MAP.put("%v", "WW");
        DATE_FORMAT_MAP.put("%w", "D");
        DATE_FORMAT_MAP.put("%Y", "YYYY");
        DATE_FORMAT_MAP.put("%y", "YY");
    }

    protected static final List<String> UNIT_LIST = Arrays.asList("SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "YEAR");

    /**
     * 处理时间格式
     * @param format
     * @return
     */
    public static StringBuilder handleDateFormat(String format) {
        PluginUtils.precondition(!PluginUtils.isEmpty(format), "时间函数的格式化参数不能为空");
        for (Map.Entry<String, String> entry : DATE_FORMAT_MAP.entrySet()) {
            format = format.replace(entry.getKey(), entry.getValue());
        }
        return new StringBuilder(format);
    }

    /**
     * 处理COALESCE函数
     * @param arguments
     * @return
     */
    public static String wrapCoalesceFunction(List<String> arguments) {
        if (null == arguments) {
            return null;
        } else {
            return String.format(FUNCTION_MAP.get("COALESCE"), String.join(",", arguments));
        }
    }

    /**
     * 处理 GROUP_CONCAT 函数
     *
     * @param keywords
     * @param arguments
     * @return
     */
    public static String wrapGroupConcatFunction(List<String> keywords, List<String> arguments) {
        if (null == arguments) {
            return null;
        } else {
            StringBuilder expressionBuilder = new StringBuilder();
            StringBuilder endExpressionBuilder = new StringBuilder();
            if (!PluginUtils.isEmpty(keywords)) {
                // pg系不需要 SEPARATOR 和 DISTINCT 关键字
                keywords.remove("SEPARATOR");
                keywords.remove("DISTINCT");
                // 处理关键字ORDER
                if (keywords.contains("ORDER")) {
                    String hyper = "";
                    for (String item : keywords) {
                        endExpressionBuilder.append(hyper).append(item);
                        hyper = " ";
                    }
                }
            }
            String hyper = "";
            for (String argument : arguments) {
                expressionBuilder.append(hyper).append(argument);
                hyper = ",";
            }
            if (endExpressionBuilder.length() > 0) {
                expressionBuilder.append(" ").append(endExpressionBuilder);
            }
            return String.format(FUNCTION_MAP.get("GROUP_CONCAT"), expressionBuilder);
        }
    }

    /**
     * 处理聚合函数
     *
     * @param template
     * @param keywords
     * @param arguments
     * @return
     */
    public static String wrapAggregateFunction(String template, List<String> keywords, List<String> arguments) {
        PluginUtils.precondition(arguments != null && arguments.size() >= 1, "函数参数不能为空");
        StringBuilder expressionBuilder = new StringBuilder();
        if(!PluginUtils.isEmpty(keywords)) {
            keywords.forEach(keyword -> expressionBuilder.append(keyword).append(" "));
        }
        String hyper = "";
        for (String argument : arguments) {
            expressionBuilder.append(hyper).append(argument);
            hyper = ",";
        }
        return String.format(template, expressionBuilder);
    }

    /**
     * 处理日期加减函数
     *
     * @param template
     * @param arguments
     * @return
     */
    public static String wrapDateAddOrSubFunction(String template, List<String> arguments) {
        String date = arguments.get(0);
        String[] args = arguments.get(1).split(" ");
        String dateNum = args[1];
        String dateUnit = null;
        if (UNIT_LIST.contains(args[2].toUpperCase())) {
            dateUnit = args[2];
        } else {
            return null;
        }
        return String.format(template, date, dateNum, dateUnit);
    }
}
