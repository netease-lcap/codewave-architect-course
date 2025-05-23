
package com.netease.cloud.lowcode.owl;

import com.netease.cloud.lowcode.extension.PostgresqlDataSourcePlugin;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.ddl.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.maven.MavenDependence;
import com.netease.cloud.lowcode.owl.spi.rdb.exception.LcapRdbPluginException;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.IdentifierCaseEnum;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.PluginUtils;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.RandomUtils;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 添加依赖<dependency><groupId>junit</groupId><artifactId>junit</artifactId><version>4.13.2</version><scope>test</scope></dependency>
 * <dependency><groupId>com.fasterxml.jackson.core</groupId><artifactId>jackson-databind</artifactId><version>2.16.1</version><scope>test</scope></dependency>
 * 测试套件，包括RdbDataSourcePlugin接口所有实现，自上而下执行
 * 中途执行失败可单独执行testToDropTableSql方法
 */
public class TestPlugin extends TestCase {
    // 插件实例需要手动修改
    protected static PostgresqlDataSourcePlugin plugin = new PostgresqlDataSourcePlugin();
    //记录了数据源信息
    protected static RdbDataSource rdbDataSource = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dataSource.json"), RdbDataSource.class);
    //记录了表信息
    protected static RdbTableInfo rdbTableInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/ddl/DdlRdbTableInfo.json"), RdbTableInfo.class);
    //记录了需要创建的账号信息
    private static final RdbAccountInfo rdbAccountInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/rdbAccount.json"), RdbAccountInfo.class);

    /**
     * 定义数据库类型，所有插件必须唯一
     */
    public void testDbType() {
        assertEquals(rdbDataSource.getDbType(), plugin.dbType());
        System.out.println("测试DbType方法结束  DbType：" + plugin.dbType());
    }

    /**
     * 测试获取数据库连接URL，包括host、port、dbname、schemaName、其他配置等参数
     * 其中host支持多种格式，包括host、host:port、host1,host2,host3:port
     * host，port，dbname都是必填项
     * 对于postgresql，schemaName也是必填项
     */
    public void testGetJdbcUrl() {
        String jdbcUrl = plugin.getJdbcUrl(rdbDataSource);
        System.out.println("测试GetJdbcUrl方法结束  jdbcUrl：" + jdbcUrl);
    }

    /**
     * 返回jdbc驱动
     */
    public void testGetJdbcDriver() {
        Driver jdbcDriver = plugin.getJdbcDriver(rdbDataSource);
        System.out.println("测试GetJdbcDriver方法结束  jdbcDriver：" + jdbcDriver.getClass());
    }

    /**
     * 返回jdbc驱动的maven依赖坐标，生成代码时需要
     */
    public void testMavenDependence() {
        MavenDependence mavenDependence = plugin.mavenDependence();
        System.out.println("测试MavenDependence方法结束  mavenDependence：" + mavenDependence);
    }

    /**
     * 返回插件依赖的maven坐标列表，包括上边的jdbc driver的maven依赖坐标
     */
    public void testMavenDependences() {
        List<MavenDependence> mavenDependences = plugin.mavenDependences();
        System.out.println("测试MavenDependences方法结束  mavenDependences：" + mavenDependences);
    }

    /**
     * 返回该数据库的字段类型和nasl类型的映射关系
     * 返回值key为nasl类型(String、Integer、Long、Double、Decimal、Text、Boolean、Date、Time、Datetime)
     * 返回值value描述List，描述该nasl类型可映射成的数据库类型列表
     */
    public void testGetDbColumnTypeMappings() {
        Map<String, List<RdbColumnMapping>> dbColumnTypeMappings = plugin.getDbColumnTypeMappings();
        System.out.println("测试GetDbColumnTypeMappings方法结束  dbColumnTypeMappings：" + dbColumnTypeMappings);
    }

    /**
     * 查询数据库集合
     */
    public void testShowDatabases() throws Exception {
        Connection connection = this.getConnection();
        List<String> databaseList = plugin.showDatabases(connection);
        if (!PluginUtils.isEmpty(rdbDataSource.getDbname())) {
            assertTrue(databaseList.contains(rdbDataSource.getDbname()));
        }

        System.out.println("测试showDatabases方法结束  databaseList：" + databaseList);
    }

    /**
     * 生成建表语句
     */
    public void testToCreateTableSql() throws Exception {
        this.testToDropTableSql();
        rdbTableInfo.getColumns().get(0).setSequenceName(RandomUtils.generateStr(10));
        String createTableSql = plugin.toCreateTableSql(rdbTableInfo);
        this.executeSql(createTableSql);
        System.out.println("测试toCreateTableSql方法结束,新增表： " + plugin.wrapTableName(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName()));
    }

    /**
     * 测试获取数据库中的数据表列表
     * 如果包含schemaName，则返回schemaName下的数据表列表
     */
    public void testShowTables() throws Exception {
        Connection connection = this.getConnection();
        List<String> tables = plugin.showTables(connection, rdbDataSource.getSchemaName());
        assertTrue(tables.contains(rdbTableInfo.getTableName()));
        System.out.println("测试showTables方法结束  查询表列表：" + tables);
    }

    /**
     * 测试获取数据表中的索引列表
     * 如果包含schemaName，则需要指定schemaName
     */
    public void testShowIndexes() throws Exception {
        Connection connection = this.getConnection();
        List<RdbIndexInfo> actualIndexList = plugin.showIndexes(connection, rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        Map<String, RdbIndexInfo> actualIndexMap = actualIndexList.stream().collect(Collectors.toMap(RdbIndexInfo::getIndexName, Function.identity()));
        assertTrue(actualIndexMap.keySet().containsAll(Arrays.asList("idx_name", "idx_age")));
        assertFalse((actualIndexMap.get("idx_name")).getUnique());
        assertFalse((actualIndexMap.get("idx_name")).getPrimary());
        assertEquals("name", (String) (actualIndexMap.get("idx_name")).getColumnNames().get(0));
        assertFalse((actualIndexMap.get("idx_age")).getUnique());
        assertFalse((actualIndexMap.get("idx_age")).getPrimary());
        assertEquals("age", (String) (actualIndexMap.get("idx_age")).getColumnNames().get(0));
        actualIndexList.stream().filter(RdbIndexInfo::getPrimary).findFirst().ifPresent((primaryIndex) -> {
            assertEquals("id", (String) primaryIndex.getColumnNames().get(0));
            assertTrue(primaryIndex.getUnique());
        });
        System.out.println("测试showIndexes方法结束  数据库索引列表：" + actualIndexList);
    }

    /**
     * 测试获取数据表的整体信息，包括字段信息、索引信息、表注释等
     */
    public void testDescribeTable() throws Exception {
        Connection connection = this.getConnection();
        RdbTableInfo describeTable = plugin.describeTable(connection, rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        assertEquals(rdbTableInfo.getTableName(), describeTable.getTableName());
        assertEquals(rdbTableInfo.getComment(), describeTable.getComment());
        assertEquals(rdbTableInfo.getColumns().size(), describeTable.getColumns().size());
        assertEquals(rdbTableInfo.getIndexes().size(), describeTable.getIndexes().size());
        System.out.println("测试describeTable方法结束  表信息：" + describeTable);
    }

    /**
     * 查询sequence序列，没有返回null
     *
     * @throws Exception
     */
    public void testShowSequences() throws Exception {
        Connection connection = this.getConnection();
        List<RdbSequenceInfo> sequences = plugin.showSequences(connection, rdbDataSource.getSchemaName());
        System.out.println("测试showSequences方法结束  序列信息：" + sequences);
    }

    /**
     * 查询某张表的存储大小
     */
    public void testTableSize() throws Exception {
        Connection connection = this.getConnection();

        try {
            long tabledSize = plugin.tableSize(connection, rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
            assertEquals(0L, tabledSize);
            System.out.println("测试tableSize方法结束  表大小：" + tabledSize);
        } catch (LcapRdbPluginException var4) {
            System.err.println("测试tableSize方法结束  ：" + var4.getMessage());
        }

    }

    /**
     * 查询数据库账户信息，包括账户名、密码、白名单ip等
     */
    public void testShowAccountInfo() throws Exception {
        Connection connection = this.getConnection();

        try {
            RdbAccountInfo rdbAccountInfo = plugin.showAccountInfo(connection, rdbDataSource.getSchemaName(), rdbDataSource.getUsername());
            System.out.println("测试showAccountInfo方法结束  rdbAccountInfo：" + rdbAccountInfo);
        } catch (LcapRdbPluginException var3) {
            System.err.println("测试showAccountInfo方法结束  ：" + var3.getMessage());
        }

    }

    /**
     * 生成数据表重命名语句
     */
    public void testToRenameTableSql() throws Exception {
        String ReNameTableName = "rename_table";
        RdbTableInfo renameTableInfo = new RdbTableInfo();
        renameTableInfo.setTableName(ReNameTableName);
        this.executeSql(plugin.toRenameTableSql(rdbTableInfo, renameTableInfo));
        assertFalse(plugin.showTables(this.getConnection(), rdbDataSource.getSchemaName()).contains(rdbTableInfo.getTableName()));
        assertTrue(plugin.showTables(this.getConnection(), rdbDataSource.getSchemaName()).contains(ReNameTableName));
        String tableName = rdbTableInfo.getTableName();
        this.executeSql(plugin.toRenameTableSql(renameTableInfo, rdbTableInfo));
        assertTrue(plugin.showTables(this.getConnection(), rdbDataSource.getSchemaName()).contains(tableName));
        assertFalse(plugin.showTables(this.getConnection(), rdbDataSource.getSchemaName()).contains(ReNameTableName));
        System.out.println("测试toRenameTableSql方法结束 ");
    }

    /**
     * 生成新增数据表字段语句
     */
    public void testToAddTableColumnSql() throws Exception {
        RdbColumnInfo rdbColumnInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dml/DmlAddColumn.json"), RdbColumnInfo.class);
        this.executeSql(plugin.toAddTableColumnSql(rdbTableInfo, rdbColumnInfo));
        RdbTableInfo tableInfo = plugin.describeTable(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        assertTrue(tableInfo.getColumns().stream().anyMatch((columnInfo) -> {
            if (columnInfo.getColumnName().equals("remark")) {
//                assertEquals("123", columnInfo.getDefaultValue().replaceAll("[\\s']", ""));
                assertTrue(columnInfo.getNotNull());
//                assertEquals("备注", columnInfo.getComment().replaceAll("[\\s']", ""));
                return true;
            } else {
                return false;
            }
        }));
        System.out.println("测试toAddTableColumnSql方法结束 ");
    }

    /**
     * 生成修改数据表字段语句
     */
    public void testToAlterTableColumnSql() throws Exception {
        RdbColumnInfo rdbColumnInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dml/DmlAddColumn.json"), RdbColumnInfo.class);
        RdbColumnInfo newPercentColumn = new RdbColumnInfo();
        newPercentColumn.setColumnName("remark");
        Map<String, List<RdbColumnMapping>> dbColumnTypeMappings = plugin.getDbColumnTypeMappings();
        newPercentColumn.setColumnType(((RdbColumnMapping) ((List) dbColumnTypeMappings.get("Long")).get(0)).getColumnType());
        newPercentColumn.setComment("修改备注");
        newPercentColumn.setDefaultValue("456");
        newPercentColumn.setNotNull(false);
        this.executeSql(plugin.toAlterTableColumnSql(rdbTableInfo, rdbColumnInfo, newPercentColumn));
        RdbTableInfo tableInfo = plugin.describeTable(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        assertTrue(tableInfo.getColumns().stream().anyMatch((columnInfo) -> {
            if (columnInfo.getColumnName().equals("remark")) {
                assertEquals("456", columnInfo.getDefaultValue().replaceAll("[\\s']", ""));
                assertFalse(columnInfo.getNotNull());
//                assertEquals("修改备注", columnInfo.getComment().replaceAll("[\\s']", ""));
                return true;
            } else {
                return false;
            }
        }));
        this.executeSql(plugin.toAlterTableColumnSql(rdbTableInfo, newPercentColumn, rdbColumnInfo));
        tableInfo = plugin.describeTable(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        assertTrue(tableInfo.getColumns().stream().anyMatch((columnInfo) -> {
            if (columnInfo.getColumnName().equals("remark")) {
//                assertEquals("123", columnInfo.getDefaultValue().replaceAll("[\\s']", ""));
                assertTrue(columnInfo.getNotNull());
//                assertEquals("备注", columnInfo.getComment().replaceAll("[\\s']", ""));
                return true;
            } else {
                return false;
            }
        }));
        System.out.println("测试toAlterTableColumnSql方法结束 ");
    }

    /**
     * 生成删除数据表字段语句
     */
    public void testToDropTableColumnSql() throws Exception {
        RdbColumnInfo rdbColumnInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dml/DmlAddColumn.json"), RdbColumnInfo.class);
        this.executeSql(plugin.toDropTableColumnSql(rdbTableInfo, rdbColumnInfo));
        RdbTableInfo tableInfo = plugin.describeTable(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        assertFalse(tableInfo.getColumns().stream().anyMatch((columnInfo) -> columnInfo.getColumnName().equals("remark")));
        System.out.println("测试toDropTableColumnSql方法结束 ");
    }

    /**
     * 生成添加数据表索引语句
     */
    public void testToAddTableIndexSql() throws Exception {
        RdbIndexInfo rdbIndexInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dml/DmlAddIndex.json"), RdbIndexInfo.class);
        assertFalse(plugin.showIndexes(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName()).stream().anyMatch((indexInfo) -> rdbIndexInfo.getIndexName().equals(indexInfo.getIndexName())));
        this.executeSql(plugin.toAddTableIndexSql(rdbTableInfo, rdbIndexInfo));
        RdbIndexInfo tempRemarkIndex = plugin.showIndexes(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName()).stream().filter((index) -> rdbIndexInfo.getIndexName().equals(index.getIndexName())).findFirst().orElse(null);
        assertNotNull(tempRemarkIndex);
        assertEquals(rdbIndexInfo.getIndexName(), tempRemarkIndex.getIndexName());
        assertEquals(rdbIndexInfo.getColumnNames().size(), tempRemarkIndex.getColumnNames().size());
        assertEquals(rdbIndexInfo.getUnique(), tempRemarkIndex.getUnique());
        System.out.println("测试toAddTableIndexSql方法结束 ");
    }

    /**
     * 生成修改数据表索引语句
     */
    public void testToRenameTableIndexSql() throws Exception {
        RdbIndexInfo rdbIndexInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dml/DmlAddIndex.json"), RdbIndexInfo.class);
        RdbIndexInfo newEmailIndex = new RdbIndexInfo("idx_email_new");
        this.executeSql(plugin.toRenameTableIndexSql(rdbTableInfo, rdbIndexInfo, newEmailIndex));
        RdbIndexInfo tempRemarkIndex = plugin.showIndexes(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName()).stream().filter((index) -> newEmailIndex.getIndexName().equals(index.getIndexName())).findFirst().orElse(null);
        assertNotNull(tempRemarkIndex);
        assertEquals(newEmailIndex.getIndexName(), tempRemarkIndex.getIndexName());
        assertEquals(rdbIndexInfo.getColumnNames().size(), tempRemarkIndex.getColumnNames().size());
        assertEquals(rdbIndexInfo.getUnique(), tempRemarkIndex.getUnique());
        this.executeSql(plugin.toRenameTableIndexSql(rdbTableInfo, newEmailIndex, rdbIndexInfo));
        assertNotNull(plugin.showIndexes(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName()).stream().filter((index) -> rdbIndexInfo.getIndexName().equals(index.getIndexName())).findFirst().orElse(null));
        System.out.println("测试toRenameTableIndexSql方法结束 ");
    }

    /**
     * 测试删除表索引的sql
     */
    public void testToDropTableIndexSql() throws Exception {
        RdbIndexInfo rdbIndexInfo = TestUtils.getObjectFromInputStream(TestPlugin.class.getResourceAsStream("/dml/DmlAddIndex.json"), RdbIndexInfo.class);
        assertTrue(plugin.showIndexes(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName()).stream().anyMatch((indexInfo) -> rdbIndexInfo.getIndexName().equals(indexInfo.getIndexName())));
        this.executeSql(plugin.toDropTableIndexSql(rdbTableInfo, rdbIndexInfo));
        assertFalse(plugin.showIndexes(this.getConnection(), rdbDataSource.getSchemaName(), rdbTableInfo.getTableName()).stream().anyMatch((indexInfo) -> rdbIndexInfo.getIndexName().equals(indexInfo.getIndexName())));
        System.out.println("测试toDropTableIndexSql方法结束 ");
    }

    /**
     * 测试设置主键自增的sql，这里很多数据库是不支持的，不支持的数据库可以抛出异常不支持
     */
    public void testToSetAutoIncrement() throws Exception {
        // 找到主键，mock一个序列名,测试序列不存在的情况
        RdbColumnInfo primaryKey = rdbTableInfo.getColumns().stream().filter(column -> "id".equals(column.getColumnName())).findFirst().orElse(null);
        assertNotNull(primaryKey);
        primaryKey.setSequenceName(RandomUtils.generateLetterStr(10));
        assertFalse(plugin.showSequences(getConnection(), rdbDataSource.getSchemaName()).stream().anyMatch(sequenceInfo -> primaryKey.getSequenceName().equals(sequenceInfo.getSequenceName())));
        executeSql(plugin.toSetAutoIncrement(rdbTableInfo, primaryKey, 1L, false));
        List<RdbSequenceInfo> sequenceInfoList = plugin.showSequences(getConnection(), rdbDataSource.getSchemaName());
        assertFalse(PluginUtils.isEmpty(sequenceInfoList));
        assertTrue(sequenceInfoList.stream().anyMatch(sequenceInfo -> primaryKey.getSequenceName().equals(sequenceInfo.getSequenceName())));


        //测试序列存在的情况
        Long startValue = 5L;
        String[] splitSql = plugin.toSetAutoIncrement(rdbTableInfo, primaryKey, startValue, true).split(";");
        this.executeSql(splitSql[0]);
        if (splitSql[1].trim().length() != 0) {
            //序列的nextval
            List<Map<String, Object>> maps = executeQuerySql(splitSql[1]);
            maps.get(0).forEach((key, value) -> assertEquals(5L, value));
            startValue++;
        }
        RdbSequenceInfo tempSequenceInfo = plugin.showSequences(this.getConnection(), rdbDataSource.getSchemaName()).stream().filter((sequenceInfo) -> primaryKey.getSequenceName().equals(sequenceInfo.getSequenceName())).findFirst().orElse(null);
        assertEquals(String.valueOf(startValue), tempSequenceInfo.getLastNumber());
        System.out.println("测试toSetAutoIncrement方法结束 ");
    }
    /** dml sql生成相关 **/
    /**
     * 生成数据插入语句
     */
    public void testToInsertSql() throws Exception {
        RdbInsertParam rdbInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbInsertParam.json"), RdbInsertParam.class);
        assertNotNull(rdbInsertParam);
        this.executeSql(plugin.toInsertSql(rdbInsertParam).getSql());
        RdbSelectParam rdbSelectParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbSelectParam.json"), RdbSelectParam.class);
        RdbDmlPrepareSql selectSql = plugin.toSelectSql(rdbSelectParam);
        List<Map<String, Object>> mapList = this.executeQuerySql(selectSql.getSql(), selectSql.getValues());
        assertEquals(1, mapList.size());
        rdbInsertParam.getColumns().forEach((columnInfo) -> {
            Iterator var2 = mapList.iterator();

            while (var2.hasNext()) {
                Map<String, Object> stringObjectMap = (Map) var2.next();
                if (stringObjectMap.containsKey(columnInfo.getColumnName())) {
                    assertEquals(stringObjectMap.get(columnInfo.getColumnName()).toString(), columnInfo.getColumnValue());
                }
            }

        });
        this.executeSql(plugin.toTruncateTableSql(rdbTableInfo));
        System.out.println("测试toInsertSql方法结束 ");
    }

    /**
     * 生成批量数据插入语句
     */
    public void testToBatchInsertSql() throws Exception {
        RdbBatchInsertParam rdbBatchInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbBatchInsertParam.json"), RdbBatchInsertParam.class);
        assertNotNull(rdbBatchInsertParam);
        this.executeSql(plugin.toBatchInsertSql(rdbBatchInsertParam, true).getSql());
        RdbSelectParam rdbSelectParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbSelectParam.json"), RdbSelectParam.class);
        rdbSelectParam.setWheres(null);
        RdbDmlPrepareSql selectSql = plugin.toSelectSql(rdbSelectParam);
        List<Map<String, Object>> mapList = this.executeQuerySql(selectSql.getSql(), selectSql.getValues());
        assertEquals(rdbBatchInsertParam.getColumns().size(), mapList.size());
        this.executeSql(plugin.toTruncateTableSql(rdbTableInfo));
        System.out.println("测试toBatchInsertSql方法结束 ");
    }

    /**
     * 生成数据更新语句
     */
    public void testToUpdateSql() throws Exception {
        RdbInsertParam rdbInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbInsertParam.json"), RdbInsertParam.class);
        assertNotNull(rdbInsertParam);
        this.executeSql(plugin.toInsertSql(rdbInsertParam).getSql());
        RdbUpdateParam rdbUpdateParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbUpdateParam.json"), RdbUpdateParam.class);
        assertNotNull(rdbUpdateParam);
        this.executeSql(plugin.toUpdateSql(rdbUpdateParam).getSql());
        RdbSelectParam rdbSelectParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbSelectParam.json"), RdbSelectParam.class);
        RdbDmlPrepareSql selectSql = plugin.toSelectSql(rdbSelectParam);
        List<Map<String, Object>> mapList = this.executeQuerySql(selectSql.getSql(), selectSql.getValues());
        rdbUpdateParam.getColumns().forEach((columnInfo) -> {
            Iterator var2 = mapList.iterator();

            while (var2.hasNext()) {
                Map<String, Object> stringObjectMap = (Map) var2.next();
                if (stringObjectMap.containsKey(columnInfo.getColumnName())) {
                    assertEquals(stringObjectMap.get(columnInfo.getColumnName()).toString(), columnInfo.getColumnValue());
                }
            }

        });
        this.executeSql(plugin.toTruncateTableSql(rdbTableInfo));
        System.out.println("测试toUpdateSql方法结束 ");
    }

    /**
     * 生成数据删除语句
     */
    public void testToDeleteSql() throws Exception {
        RdbInsertParam rdbInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbInsertParam.json"), RdbInsertParam.class);
        assertNotNull(rdbInsertParam);
        this.executeSql(plugin.toInsertSql(rdbInsertParam).getSql());
        RdbSelectParam rdbSelectParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbSelectParam.json"), RdbSelectParam.class);
        RdbDmlPrepareSql selectSql = plugin.toSelectSql(rdbSelectParam);
        List<Map<String, Object>> mapList = this.executeQuerySql(selectSql.getSql(), selectSql.getValues());
        assertEquals(1, mapList.size());
        RdbDeleteParam rdbDeleteParam = (RdbDeleteParam) TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbDeleteParam.json"), RdbDeleteParam.class);
        this.executeSql(plugin.toDeleteSql(rdbDeleteParam).getSql());
        mapList = this.executeQuerySql(selectSql.getSql(), selectSql.getValues());
        assertEquals(0, mapList.size());
        System.out.println("测试toDeleteSql方法结束 ");
    }

    /**
     * 生成查询语句
     */
    public void testToSelectSql() throws Exception {
        RdbSelectParam rdbSelectParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbSelectParam.json"), RdbSelectParam.class);
        assertNotNull(rdbSelectParam);
        RdbDmlPrepareSql selectSql = plugin.toSelectSql(rdbSelectParam);
        List<Map<String, Object>> mapList = this.executeQuerySql(selectSql.getSql(), selectSql.getValues());
        assertEquals(0, mapList.size());
        System.out.println("测试toSelectSql方法结束 ");
    }
    // sql解析相关

    /**
     * 解析表结构，sql文件中可能存在一些不符合nasl规范、不兼容的表结构，需要解析成功或者失败的表
     *
     * @return key-解析出的表信息，value：失败或者成功信息
     */
    public void testParseCreateSql() throws Exception {
        System.out.println("测试parseCreateSql方法结束 ");
    }

    /**
     * 处理关键字，比如mysql是`xxxx`，oracle是"xxxxx"
     */
    public void testWrapKeyword() throws Exception {
        String keyword = "test";
        System.out.println("测试WrapKeyWord结束 转化前keyword：" + keyword + " 转化后keyword：" + plugin.wrapKeyword(keyword));
    }

    /**
     * 处理表名，比如db2的sql中需要$schema.$tableName
     * 不过大多数数据库应该只要简单返回tableName即可
     */
    public void testWrapTableName() throws Exception {
        String tableName = "test";
        assertEquals(plugin.wrapKeyword(tableName), plugin.wrapTableName((String) null, tableName));
        if (!PluginUtils.isEmpty(rdbDataSource.getSchemaName())) {
            //兼容多模式
            assertEquals(plugin.wrapKeyword(rdbDataSource.getSchemaName().split(",")[0]) + "." + plugin.wrapKeyword(tableName), plugin.wrapTableName(rdbDataSource.getSchemaName(), tableName));
        }

        System.out.println("测试WrapTableName结束 ");
    }

    /**
     * 这里比较特殊，是测试一个废弃的方法
     */
    public void testWrapLimitClause() throws Exception {
        RdbBatchInsertParam rdbBatchInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbBatchInsertParam.json"), RdbBatchInsertParam.class);
        assertNotNull(rdbBatchInsertParam);
        this.executeSql(plugin.toBatchInsertSql(rdbBatchInsertParam, true).getSql());
        String sql = "SELECT * from " + plugin.wrapTableName(rdbDataSource.getSchemaName(), rdbTableInfo.getTableName());
        List<Map<String, Object>> result = this.executeQuerySql(plugin.wrapLimitClause(sql, "1", "1"));
        assertEquals(1, result.size());
        this.executeSql(plugin.toTruncateTableSql(rdbTableInfo));
        System.out.println("测试WrapLimitClause结束 ");
    }

    /**
     * 处理插入数据后查询自增主键的语句
     * 比如oracle是SELECT ${sequence}.NEXTVAL as "${pkColumnName}" from dual
     * 而mysql原生支持自增，所以mybatis里面可以使用useGeneratedKeys=true，这种情况返回null即可
     */
    public void testWrapSelectKey() throws Exception {
        RdbColumnInfo primaryKey = rdbTableInfo.getColumns().stream().filter(column -> "id".equals(column.getColumnName())).findFirst().orElse(null);
        assertNotNull(primaryKey);
        primaryKey.setSequenceName(RandomUtils.generateLetterStr(10));
        assertFalse(plugin.showSequences(getConnection(), rdbDataSource.getSchemaName()).stream().anyMatch(sequenceInfo -> primaryKey.getSequenceName().equals(sequenceInfo.getSequenceName())));
        executeSql(plugin.toSetAutoIncrement(rdbTableInfo, primaryKey, 1L, false));
        List<RdbSequenceInfo> rdbSequenceInfos = plugin.showSequences(getConnection(), rdbDataSource.getSchemaName());
        assertFalse(PluginUtils.isEmpty(rdbSequenceInfos));
        assertTrue(rdbSequenceInfos.stream().anyMatch(sequenceInfo -> primaryKey.getSequenceName().equals(sequenceInfo.getSequenceName())));


        String selectKey = plugin.wrapSelectKey(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName(), primaryKey.getSequenceName(), primaryKey.getColumnType(), primaryKey.getColumnName());
        if (!PluginUtils.isEmpty(selectKey)) {
            List<Map<String, Object>> maps = this.executeQuerySql(selectKey);
            assertNotNull(maps);
        }

        System.out.println("测试WrapSelectKey结束 ");
    }

    /**
     * 包装二进制值
     */
    public void testWrapBinaryValue() throws Exception {
        String value = "abcd";
        System.out.println("测试WrapBinaryValue结束 转化前value：" + value + " 转化后value：" + plugin.wrapBinaryValue(value));
    }

    /**
     * 包装sql中的boolean值，默认不加 "'"
     */
    public void testWrapBooleanValue() throws Exception {
        System.out.println("测试WrapBooleanValue结束 转化前value：true 转化后value：" + plugin.wrapBooleanValue(true));
        System.out.println("测试WrapBooleanValue结束 转化前value：false 转化后value：" + plugin.wrapBooleanValue(false));
    }

    /**
     * 包装sql中的String值，默认加 "'"
     */
    public void testWrapStringValue() throws Exception {
        System.out.println("测试WrapStringValue结束 转化前value：test 转化后value：" + plugin.wrapStringValue("test"));
    }

    /**
     * 包装sql中的数字值，默认不加 "'"
     */
    public void testWrapNumberValue() throws Exception {
        int intValue = RandomUtils.generateInt(1, 100);
        long longValue = RandomUtils.generateLong(1L, 100L);
        assertNull(plugin.wrapNumberValue(null));
        assertEquals(String.valueOf(intValue), plugin.wrapNumberValue(intValue));
        assertEquals(String.valueOf(longValue), plugin.wrapNumberValue(longValue));
        System.out.println("测试WrapNumberValue结束 ");
    }

    /**
     * 包装sql中日期类型值，转化为固定格式并加"'", 不同数据库对于时间类型数值处理方式不一样，特别当传入的值是个字符串时
     */
    public void testWrapDateValue() throws Exception {
        LocalDate localDate = LocalDate.now();
        assertEquals("'" + localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + "'", plugin.wrapDateValue(localDate));
        System.out.println("测试WrapDateValue结束 ");
    }

    /**
     * 包装sql中时间类型值，转化为固定格式并加"'", 不同数据库对于时间类型数值处理方式不一样，特别当传入的值是个字符串时
     */
    public void testWrapTimeValue() throws Exception {
        LocalTime localTime = LocalTime.now();
        assertEquals("'" + localTime.format(DateTimeFormatter.ofPattern("HH:mm:ss")) + "'", plugin.wrapTimeValue(localTime));
        System.out.println("测试WrapTimeValue结束 ");
    }

    /**
     * 包装sql中日期时间类型值，转化为固定格式并加"'", 不同数据库对于时间类型数值处理方式不一样，特别当传入的值是个字符串时
     */
    public void testWrapDatetimeValue() throws Exception {
        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        assertEquals("'" + zonedDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z")) + "'", plugin.wrapDatetimeValue(zonedDateTime));
        System.out.println("测试WrapDatetimeValue结束 ");
    }

    /**
     * 处理sql中的函数调用，为了支持ide内的oql，不同数据库的函数定义可能不尽相同，所以需要特殊处理
     *
     * @return
     */
    public void testWrapFunction() throws Exception {
        //支持的函数已经函数说明： https://community.codewave.163.com/CommunityParent/fileIndex?filePath=20.%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%2F15.%E9%80%BB%E8%BE%91%E5%8A%9F%E8%83%BD%E5%AE%9E%E7%8E%B0%2F40.%E9%80%BB%E8%BE%91%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%2F37.%E6%95%B0%E6%8D%AE%E6%9F%A5%E8%AF%A2%2F32.SQL%E6%9F%A5%E8%AF%A2%2F50.SQL%E6%9F%A5%E8%AF%A2%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md
        RdbInsertParam rdbInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbInsertParam.json"), RdbInsertParam.class);
        this.executeSql(plugin.toInsertSql(rdbInsertParam).getSql());
        String selectSql = "select %s  from " + plugin.wrapTableName(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName());
        try {
            //字符串处理：CONCAT, LEFT, IFNULL, LENGTH, SUBSTR, DATE_FORMAT, STR_TO_DATE, CONTAINS, ENDS-WITH, STARTS-WITH, LOWER, REPLACE, UPPER
            List<Map<String, Object>> maps = executeQuerySql(String.format(selectSql, plugin.wrapConcatFunction(plugin.wrapKeyword("id"), plugin.wrapKeyword("name"))));
            maps.get(0).forEach((key, value) -> assertEquals("1Jack", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("LEFT", null, Arrays.asList(plugin.wrapKeyword("name"), "2"))));
            maps.get(0).forEach((key, value) -> assertEquals("Ja", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("IFNULL", null, Arrays.asList(plugin.wrapKeyword("delete_time"), plugin.wrapStringValue("2024-01-01 00:00:00")))));
            maps.get(0).forEach((key, value) -> assertNotNull(value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("LENGTH", null, Collections.singletonList(plugin.wrapKeyword("name")))));
            maps.get(0).forEach((key, value) -> assertEquals(4, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("SUBSTR", null, Arrays.asList(plugin.wrapKeyword("name"), "1", "2"))));
            maps.get(0).forEach((key, value) -> assertEquals("Ja", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("DATE_FORMAT", null, Arrays.asList(plugin.wrapKeyword("created_time"), plugin.wrapStringValue("%Y-%m-%d")))));
            maps.get(0).forEach((key, value) -> assertEquals("2024-01-16", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("STR_TO_DATE", null, Arrays.asList(plugin.wrapStringValue("2024-01-16"), plugin.wrapStringValue("%Y-%m-%d")))));
            maps.get(0).forEach((key, value) -> assertEquals(Timestamp.valueOf("2024-01-16 00:00:00"), value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("LOWER", null, Collections.singletonList(plugin.wrapKeyword("name")))));
            maps.get(0).forEach((key, value) -> assertEquals("jack", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("REPLACE", null, Arrays.asList(plugin.wrapKeyword("name"), plugin.wrapStringValue("Jack"), plugin.wrapStringValue("Jack")))));
            maps.get(0).forEach((key, value) -> assertEquals("Jack", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("UPPER", null, Collections.singletonList(plugin.wrapKeyword("name")))));
            maps.get(0).forEach((key, value) -> assertEquals("JACK", value));


            //数学运算：ROUND, TRUNCATE
            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("ROUND", null, Arrays.asList("123.456", "2"))));
            maps.get(0).forEach((key, value) -> assertEquals("123.46", value.toString()));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("TRUNCATE", null, Arrays.asList("123.456", "2"))));
            maps.get(0).forEach((key, value) -> assertEquals("123.45", value.toString()));


            //日期时间处理：DATE, YEAR, DATE_ADD, TO_DAYS, NOW, DAY-FROM-DATETIME, HOURS-FROM-DATETIME, MINUTES-FROM-DATETIME, MONTH-FROM-DATETIME, YEAR-FROM-DATETIME, QUARTER-FROM-DATETIME
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse("2024-01-16");
            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("DATE", null, Collections.singletonList(plugin.wrapStringValue("2024-01-16")))));
            maps.get(0).forEach((key, value) -> assertEquals(date, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("YEAR", null, Collections.singletonList(plugin.wrapStringValue("2024-01-16")))));
            maps.get(0).forEach((key, value) -> assertEquals(2024, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("TO_DAYS", null, Collections.singletonList(plugin.wrapStringValue("2024-01-16")))));
            maps.get(0).forEach((key, value) -> assertEquals(739266, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("NOW", null, null)));
            maps.get(0).forEach((key, value) -> assertNotNull(value));

            //条件处理：IF
            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("IF", null, Arrays.asList(plugin.wrapKeyword("age") + " >18", plugin.wrapStringValue("成年人"), plugin.wrapStringValue("未成年人")))));
            maps.get(0).forEach((key, value) -> assertEquals("未成年人", value));


            //聚合函数：GROUP_CONCAT, MAX, MIN, COUNT, SUM, AVG
            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("GROUP_CONCAT", null, Collections.singletonList(plugin.wrapKeyword("name")))));
            maps.get(0).forEach((key, value) -> assertEquals("Jack", value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("MAX", null, Collections.singletonList(plugin.wrapKeyword("age")))));
            maps.get(0).forEach((key, value) -> assertEquals(17, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("MIN", null, Collections.singletonList(plugin.wrapKeyword("age")))));
            maps.get(0).forEach((key, value) -> assertEquals(17, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("COUNT", null, Collections.singletonList(plugin.wrapKeyword("age")))));
            maps.get(0).forEach((key, value) -> assertEquals(1, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("SUM", null, Collections.singletonList(plugin.wrapKeyword("age")))));
            maps.get(0).forEach((key, value) -> assertEquals(17, value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("AVG", null, Collections.singletonList(plugin.wrapKeyword("age")))));
            maps.get(0).forEach((key, value) -> assertEquals(17, value));
            //连接操作：INNER JOIN, LEFT JOIN, RIGHT JOIN

            //其他：IFNULL, COALESCE
            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("IFNULL", null, Arrays.asList(plugin.wrapKeyword("delete_time"), plugin.wrapStringValue("2024-01-01 00:00:00")))));
            maps.get(0).forEach((key, value) -> assertNotNull(value));

            maps = executeQuerySql(String.format(selectSql, plugin.wrapFunction("COALESCE", null, Arrays.asList(plugin.wrapKeyword("name"), plugin.wrapStringValue("Jack")))));
            maps.get(0).forEach((key, value) -> assertEquals("Jack", value));

            System.out.println("测试WrapFunction结束 ");
        } catch (Exception e) {
            System.err.println("测试WrapFunction失败 :" + e.getMessage());
        } finally {
            this.executeSql(plugin.toTruncateTableSql(rdbTableInfo));
        }
    }

    /**
     * 拼接对应sql中的concat函数，因为不同数据的concat函数定义不太一致，所以需要插件特殊处理下
     * 因为concat调用比较频繁，所以单独定义了个方法，这个是历史原因，其实应该通调用上面的方法
     */
    public void testWrapConcatFunction() throws Exception {
        assertNull(plugin.wrapConcatFunction((String[]) null));
        String sql = plugin.wrapConcatFunction(new String[]{"'a'", "'b'", "'c'"});
        System.out.println("测试WrapConcatFunction结束 ");
    }

    /**
     * 创建数据库DDL语句
     */
    public void testToCreateDatabaseSql() throws Exception {
        try {
            String dbName = "test_dbName";
            assertFalse(plugin.showDatabases(this.getConnection()).contains(dbName));
            this.executeSql(plugin.toCreateDatabaseSql(dbName));
            assertTrue(plugin.showDatabases(this.getConnection()).contains(dbName));
            this.executeSql(plugin.toDeleteDatabaseSql(dbName));
            assertFalse(plugin.showDatabases(this.getConnection()).contains(dbName));
            System.out.println("测试toCreateDatabaseSql方法结束 ");
        } catch (LcapRdbPluginException var2) {
            System.err.println("测试toCreateDatabaseSql方法结束 ：" + var2.getMessage());
        }
    }

    /**
     * 删除数据库DDL语句
     */
    public void testToDeleteDatabaseSql() throws Exception {
        try {
            String dbName = "test_dbName";
            assertFalse(plugin.showDatabases(this.getConnection()).contains(dbName));
            this.executeSql(plugin.toCreateDatabaseSql(dbName));
            assertTrue(plugin.showDatabases(this.getConnection()).contains(dbName));
            this.executeSql(plugin.toDeleteDatabaseSql(dbName));
            assertFalse(plugin.showDatabases(this.getConnection()).contains(dbName));
            System.out.println("测试toCreateDatabaseSql方法结束 ");
        } catch (LcapRdbPluginException var2) {
            System.err.println("测试toCreateDatabaseSql方法结束 ：" + var2.getMessage());
        }
    }

    /**
     * 创建数据库账户DDL语句
     */
    public void testToCreateDbAccountSql() throws Exception {
        try {
            this.executeSql(plugin.toCreateDbAccountSql(rdbAccountInfo));
            assertTrue(plugin.showAccountInfo(this.getConnection(), rdbDataSource.getSchemaName(), rdbAccountInfo.getDbAccount()).getDbAccount().contains(rdbAccountInfo.getDbAccount()));
            System.out.println("测试toCreateDbAccountSql方法结束 ");
        } catch (LcapRdbPluginException var2) {
            System.err.println("测试toCreateDbAccountSql方法结束 ：" + var2.getMessage());
        }
    }

    /**
     * 数据库账户授权DDL语句
     */
    public void testToGrantPrivilegeSql() throws Exception {
        try {
            this.executeSql(plugin.toGrantPrivilegeSql(rdbAccountInfo, rdbDataSource.getDbname()));
            plugin.showAccountInfo(this.getConnection(), rdbDataSource.getSchemaName(), rdbAccountInfo.getDbAccount());
            assertTrue(plugin.showAccountInfo(this.getConnection(), rdbDataSource.getSchemaName(), rdbAccountInfo.getDbAccount()).getWhiteIps().containsAll(rdbAccountInfo.getWhiteIps()));
            System.out.println("测试toGrantPrivilegeSql方法结束 ");
        } catch (LcapRdbPluginException var2) {
            System.err.println("测试toGrantPrivilegeSql方法结束 ：" + var2.getMessage());
        }
    }

    /**
     * 删除数据库账户DDL语句
     */
    public void testToDeleteDbAccountSql() throws Exception {
        try {
            this.executeSql(plugin.toDeleteDbAccountSql(rdbAccountInfo));
            assertTrue(plugin.showAccountInfo(this.getConnection(), rdbDataSource.getSchemaName(), rdbAccountInfo.getDbAccount()).getPrivileges().containsAll(rdbAccountInfo.getPrivileges()));
            System.out.println("测试toDeleteDbAccountSql方法结束 ");
        } catch (LcapRdbPluginException var2) {
            System.err.println("测试toDeleteDbAccountSql方法结束 ：" + var2.getMessage());
        }
    }

    /**
     * 数据库清空表DDL语句
     */
    public void testToTruncateTableSql() throws Exception {
        RdbInsertParam rdbInsertParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbInsertParam.json"), RdbInsertParam.class);
        assertNotNull(rdbInsertParam);
        this.executeSql(plugin.toInsertSql(rdbInsertParam).getSql());
        RdbSelectParam rdbSelectParam = TestUtils.getObjectFromInputStream(this.getClass().getClassLoader().getResourceAsStream("dml/RdbSelectParam.json"), RdbSelectParam.class);
        RdbDmlPrepareSql selectSql = plugin.toSelectSql(rdbSelectParam);
        assertEquals(1, this.executeQuerySql(selectSql.getSql(), selectSql.getValues()).size());
        this.executeSql(plugin.toTruncateTableSql(rdbTableInfo));
        assertEquals(0, this.executeQuerySql(selectSql.getSql(), selectSql.getValues()).size());
        System.out.println("测试toTruncateTableSql方法结束 ");
    }

    /**
     * 包装自定义sql，有些sql作为子查询时，执行起来有些问题，比如sqlserver的order by
     */
    public void testWrapCountClause() throws Exception {
        List<Map<String, Object>> maps = this.executeQuerySql(plugin.wrapCountClause("select * from " + plugin.wrapTableName(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName())));
        assertEquals(1, maps.size());
        System.out.println("测试wrapCountClause方法结束 ");
    }

    /**
     * 校验连通性的自定义sql，比如
     * oracle的select 1 from dual，
     * mysql、sqlserver、postgresql、达梦的select 1，
     * db2的select 1 from sysibm.sysdummy1，
     *
     * @return
     */
    public void testGetValidationQuery() throws Exception {
        assertNotNull(this.executeQuerySql(plugin.getValidationQuery()));
        System.out.println("测试getValidationQuery方法结束 ");
    }

    /**
     * 包装case when函数
     */
    public void testWrapCaseWhenStatement() throws Exception {
        assertEquals("CASE a WHEN c THEN d WHEN 1+1>2 THEN f  ELSE b END", plugin.wrapCaseWhenStatement("a", "b", Arrays.asList("c", "d", "1+1>2", "f")));
    }

    /**
     * 包装错误信息，转换成可读性更强的错误信息，比如oracle的错误信息是ORA-xxxxx，需要转换成可读性更强的错误信息
     */
    public void testWrapErrorMessage() throws Exception {
        assertEquals("", plugin.wrapErrorMessage(""));
        System.out.println("测试wrapErrorMessage方法结束 ");
    }

    /**
     * 获取标志符大小写规则
     */
    public void testGetIdentifierCase() throws Exception {
        IdentifierCaseEnum identifierCase = plugin.getIdentifierCase(this.getConnection());
        System.out.println("测试getIdentifierCase方法结束，大小写规则" + identifierCase.toString());
    }

    /**
     * 删除表DDL语句
     */
    public void testToDropTableSql() throws Exception {
        Connection connection = this.getConnection();
        List<String> tables = plugin.showTables(connection, rdbDataSource.getSchemaName());
        if (tables.contains(rdbTableInfo.getTableName())) {
            String dropTableSql = plugin.toDropTableSql(rdbTableInfo);
            this.executeSql(dropTableSql);
            System.out.println("测试toDropTableSql方法结束,删除表： " + plugin.wrapTableName(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName()));
        }

    }

    protected Connection getConnection() throws Exception {
        return DriverManager.getConnection(plugin.getJdbcUrl(rdbDataSource), rdbDataSource.getUsername(), rdbDataSource.getPassword());
    }

    protected void executeSql(String sql) throws Exception {
        Connection connection = this.getConnection();

        try (Statement statement = connection.createStatement()) {
            String[] splitQueries = sql.split(";");
            for (String query : splitQueries) {
                if (query.trim().length() != 0) {
                    statement.addBatch(query);
                }
            }
            statement.executeBatch();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    protected List<Map<String, Object>> executeQuerySql(String sql) throws Exception {
        return this.executeQuerySql(sql, null);
    }

    /**
     * 执行sql查询
     */
    protected List<Map<String, Object>> executeQuerySql(String sql, List<Object> parameterValues) throws Exception {
        List<Map<String, Object>> results = new ArrayList<>();
        try (Connection connection = this.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            if (parameterValues != null) {
                for (int i = 0; i < parameterValues.size(); ++i) {
                    statement.setObject(i + 1, parameterValues.get(i));
                }
            }

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Map<String, Object> row = new HashMap<>();
                    ResultSetMetaData metaData = resultSet.getMetaData();
                    int numColumns = metaData.getColumnCount();

                    for (int i = 1; i <= numColumns; ++i) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = resultSet.getObject(i);
                        row.put(columnName, columnValue);
                    }
                    results.add(row);
                }
            }
        }
        return results;
    }

    public TestPlugin(String name) {
        super(name);
    }

    public static Test suite() {
        TestSuite suite = new TestSuite();
        suite.addTest(new TestPlugin("testDbType"));
        suite.addTest(new TestPlugin("testGetJdbcUrl"));
        suite.addTest(new TestPlugin("testGetJdbcDriver"));
        suite.addTest(new TestPlugin("testMavenDependence"));
        suite.addTest(new TestPlugin("testMavenDependences"));
        suite.addTest(new TestPlugin("testGetDbColumnTypeMappings"));
        suite.addTest(new TestPlugin("testShowDatabases"));
        suite.addTest(new TestPlugin("testToCreateTableSql"));
        suite.addTest(new TestPlugin("testShowTables"));
        suite.addTest(new TestPlugin("testShowIndexes"));
        suite.addTest(new TestPlugin("testDescribeTable"));
        suite.addTest(new TestPlugin("testShowSequences"));
        suite.addTest(new TestPlugin("testTableSize"));
        suite.addTest(new TestPlugin("testShowAccountInfo"));
        suite.addTest(new TestPlugin("testToRenameTableSql"));
        suite.addTest(new TestPlugin("testToAddTableColumnSql"));
        suite.addTest(new TestPlugin("testToAlterTableColumnSql"));
        suite.addTest(new TestPlugin("testToDropTableColumnSql"));
        suite.addTest(new TestPlugin("testToAddTableIndexSql"));
        suite.addTest(new TestPlugin("testToRenameTableIndexSql"));
        suite.addTest(new TestPlugin("testToDropTableIndexSql"));
        suite.addTest(new TestPlugin("testToSetAutoIncrement"));
        suite.addTest(new TestPlugin("testToInsertSql"));
        suite.addTest(new TestPlugin("testToBatchInsertSql"));
        suite.addTest(new TestPlugin("testToUpdateSql"));
        suite.addTest(new TestPlugin("testToDeleteSql"));
        suite.addTest(new TestPlugin("testToSelectSql"));
        suite.addTest(new TestPlugin("testParseCreateSql"));
        suite.addTest(new TestPlugin("testWrapKeyword"));
        suite.addTest(new TestPlugin("testWrapTableName"));
        suite.addTest(new TestPlugin("testWrapLimitClause"));
        suite.addTest(new TestPlugin("testWrapSelectKey"));
        suite.addTest(new TestPlugin("testWrapBinaryValue"));
        suite.addTest(new TestPlugin("testWrapBooleanValue"));
        suite.addTest(new TestPlugin("testWrapStringValue"));
        suite.addTest(new TestPlugin("testWrapNumberValue"));
        suite.addTest(new TestPlugin("testWrapDateValue"));
        suite.addTest(new TestPlugin("testWrapTimeValue"));
        suite.addTest(new TestPlugin("testWrapDatetimeValue"));
        suite.addTest(new TestPlugin("testWrapFunction"));
        suite.addTest(new TestPlugin("testWrapConcatFunction"));
        suite.addTest(new TestPlugin("testToCreateDatabaseSql"));
        suite.addTest(new TestPlugin("testToDeleteDatabaseSql"));
        suite.addTest(new TestPlugin("testToCreateDbAccountSql"));
        suite.addTest(new TestPlugin("testToGrantPrivilegeSql"));
        suite.addTest(new TestPlugin("testToDeleteDbAccountSql"));
        suite.addTest(new TestPlugin("testToTruncateTableSql"));
        suite.addTest(new TestPlugin("testWrapCountClause"));
        suite.addTest(new TestPlugin("testGetValidationQuery"));
        suite.addTest(new TestPlugin("testWrapCaseWhenStatement"));
        suite.addTest(new TestPlugin("testWrapErrorMessage"));
        suite.addTest(new TestPlugin("testGetIdentifierCase"));
        suite.addTest(new TestPlugin("testShowViews"));
        suite.addTest(new TestPlugin("testToDropTableSql"));
        return suite;
    }
}
