package com.netease.cloud.lowcode.extension;

import com.netease.cloud.lowcode.enums.TypeEnum;
import com.netease.cloud.lowcode.owl.spi.rdb.AbstractRdbDataSourcePlugin;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.ddl.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.order.RdbDmlOrderBy;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.where.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.maven.MavenDependence;
import com.netease.cloud.lowcode.owl.spi.rdb.exception.LcapRdbPluginException;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.AggregationEnum;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.PluginUtils;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.RandomUtils;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class PostgresqlDataSourcePlugin extends AbstractRdbDataSourcePlugin {

    private static final String DB_TYPE = "postgresql";

    private static final String JDBC_PREFIX = "jdbc:postgresql://";

    private static final String MAVEN_DEPENDENCE_GROUP_ID = "org.postgresql";

    private static final String MAVEN_DEPENDENCE_ARTIFACT_ID = "postgresql";

    private static final String MAVEN_DEPENDENCE_VERSION = "42.6.1";

    private static final String DEFAULT_SCHEMA = "public";

    private static final List<String> DEFAULT_DATETIME_FUNCTION_LIST = Arrays.asList("CURRENT_TIMESTAMP", "NOW()");

    private static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    private static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

    private static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    /**
     * 定义数据库类型，所有插件必须唯一
     *
     * @return
     */
    @Override
    public String dbType() {
        return DB_TYPE;
    }

    @Override
    public String baseOnDbType() {
        return "PostgreSQL";
    }

    /**
     * 拼接jdbc连接串
     * 默认格式：jdbc:postgresql://host:port/database?option1=value1&option2=value2
     * 多节点默认格式：jdbc:postgresql://host1:port1,host2,port2/database?option1=value1&option2=value2
     *
     * @param dataSourceParam
     * @return
     */
    @Override
    public String getJdbcUrl(RdbDataSource dataSourceParam) {
        PluginUtils.precondition(DB_TYPE.equals(dataSourceParam.getDbType()), "数据源类型不匹配");
        StringBuilder jdbcBuilder = new StringBuilder(JDBC_PREFIX);
        PluginUtils.precondition(!PluginUtils.isEmpty(dataSourceParam.getHost()), "数据库地址不能为空");
        String[] hosts = dataSourceParam.getHost().split(",");
        String hyper = "";
        for (String host : hosts) {
            jdbcBuilder.append(hyper).append(host.contains(":") ? host : host + ":" + dataSourceParam.getPort());
            hyper = ",";
        }
        PluginUtils.precondition(!PluginUtils.isEmpty(dataSourceParam.getDbname()), "数据库名称不能为空");
        jdbcBuilder.append("/").append(dataSourceParam.getDbname());
        hyper = "?";
        String schemaName = PluginUtils.isEmpty(dataSourceParam.getSchemaName()) ? DEFAULT_SCHEMA : dataSourceParam.getSchemaName();
        jdbcBuilder.append(hyper).append("currentSchema=").append(schemaName);
        Map<String, String> customConfigs = dataSourceParam.getCustomConfigs();
        if (customConfigs != null && customConfigs.containsKey("customSetting") && !PluginUtils.isEmpty(customConfigs.get("customSetting"))) {
            hyper = "&";
            // 如果有用户自定义的配置，使用用户的配置
            jdbcBuilder.append(hyper).append(customConfigs.get("customSetting"));
        }

        return jdbcBuilder.toString();
    }

    /**
     * 返回jdbc驱动
     *
     * @param dataSourceParam
     * @return
     */
    @Override
    public Driver getJdbcDriver(RdbDataSource dataSourceParam) {
        PluginUtils.precondition(DB_TYPE.equals(dataSourceParam.getDbType()), "数据源类型不匹配");
        try {
            return new org.postgresql.Driver();
        } catch (Exception e) {
            throw new LcapRdbPluginException("Get jdbc driver error", e);
        }
    }

    /**
     * 返回jdbc驱动的maven依赖坐标，生成代码时需要
     *
     * @return
     */
    @Override
    public MavenDependence mavenDependence() {
        MavenDependence mavenDependence = new MavenDependence();
        mavenDependence.setGroupId(MAVEN_DEPENDENCE_GROUP_ID);
        mavenDependence.setArtifactId(MAVEN_DEPENDENCE_ARTIFACT_ID);
        mavenDependence.setVersion(MAVEN_DEPENDENCE_VERSION);
        return mavenDependence;
    }

    /**
     * 查询数据库集合
     *
     * @param connection
     * @return
     */
    @Override
    public List<String> showDatabases(Connection connection) {
        List<String> databaseNames = new ArrayList<>();
        String sql = "SELECT datname FROM pg_database WHERE datistemplate = false";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String dbName = rs.getString("datname");
                if(!PluginUtils.isEmpty(dbName)) {
                    databaseNames.add(dbName);
                }
            }
        } catch (Exception e) {
            throw new LcapRdbPluginException("Show databases error", e);
        }
        return databaseNames.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList());
    }

    /**
     * 查询数据表集合，需要指定schemaName，如果不指定则默认查询public下的表
     *
     * @param connection
     * @return
     */
    @Override
    public List<String> showTables(Connection connection, String schemaName) {
        List<String> tableNames = new ArrayList<>();
        String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" +
                (PluginUtils.isEmpty(schemaName) ? DEFAULT_SCHEMA : schemaName) + "'";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String tableName = rs.getString("table_name");
                if(!PluginUtils.isEmpty(tableName)) {
                    tableNames.add(tableName);
                }
            }
        } catch (Exception e) {
            throw new LcapRdbPluginException("Show tables error", e);
        }
        return tableNames.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList());
    }

    /**
     * 查询索引集合，表名最好使用全名，如public.test
     *
     * @param connection
     * @param schemaName
     * @param tableName
     * @return
     */
    @Override
    public List<RdbIndexInfo> showIndexes(Connection connection, String schemaName, String tableName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(tableName), "表名不能为空");
        schemaName = PluginUtils.isEmpty(schemaName) ? DEFAULT_SCHEMA : schemaName;
        Map<String, RdbIndexInfo> indexInfoMap = new LinkedHashMap<>();
        try {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet rs = metaData.getIndexInfo(null, schemaName, tableName, false, false);
            Map<String, List<String>> indexColumns = new HashMap<>();
            while (rs.next()) {
                String indexName = rs.getString("INDEX_NAME");
                String columnName = rs.getString("COLUMN_NAME");
                if (!indexColumns.containsKey(indexName)) {
                    indexColumns.put(indexName, new ArrayList<>());
                }
                indexColumns.get(indexName).add(columnName);
            }
            rs.beforeFirst();
            Set<String> primaryKeys = getPrimaryKeys(connection, schemaName, tableName);
            while (rs.next()) {
                String indexName = rs.getString("INDEX_NAME");
                if (indexInfoMap.containsKey(indexName)) {
                    continue;
                }
                boolean isUnique = !rs.getBoolean("NON_UNIQUE");
                List<String> columnNames = indexColumns.get(indexName);
                RdbIndexInfo indexInfo = new RdbIndexInfo();
                indexInfo.setIndexName(indexName);
                indexInfo.setColumnNames(columnNames);
                indexInfo.setUnique(isUnique);
                indexInfo.setComment(getIndexComment(connection, schemaName, indexName));
                indexInfo.setPrimary(!PluginUtils.isEmpty(columnNames) && primaryKeys.containsAll(columnNames));
                indexInfoMap.put(indexName, indexInfo);
            }
            rs.close();
        } catch (Exception e) {
            throw new LcapRdbPluginException("Show indexes error", e);
        }
        return new ArrayList<>(indexInfoMap.values());
    }

    /**
     * 查询主键索引包含的列
     *
     * @param connection
     * @param schemaName
     * @param tableName
     * @return
     */
    protected Set<String> getPrimaryKeys(Connection connection, String schemaName, String tableName) {
        schemaName = PluginUtils.isEmpty(schemaName) ? DEFAULT_SCHEMA : schemaName;
        Set<String> primaryKeys = new HashSet<>();
        String sql = "SELECT kcu.column_name AS column_name FROM information_schema.table_constraints AS tc " +
                "JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name " +
                "WHERE tc.constraint_type='PRIMARY KEY' AND tc.table_schema='" + schemaName + "' and tc.table_name='" + tableName + "'";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String columnName = rs.getString("column_name");
                primaryKeys.add(columnName);
            }
        } catch (Exception e) {
            throw new LcapRdbPluginException("Get primary keys error", e);
        }
        return primaryKeys;
    }

    /**
     * JDBC的实现方法内没有索引注释，需要单独查询
     *
     * @param connection
     * @param schemaName
     * @param indexName
     * @return
     * @throws SQLException
     */
    protected String getIndexComment(Connection connection, String schemaName, String indexName) throws SQLException {
        String sql = "SELECT obj_description(indexrelid, 'pg_class') AS comment FROM pg_index JOIN pg_class ON pg_index.indexrelid = pg_class.oid WHERE pg_class.relname = ? AND pg_class.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = ?)";
        String comment = null;
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, indexName);
            stmt.setString(2, schemaName);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    comment = rs.getString("comment");
                }
            }
        }
        return comment;
    }

    /**
     * 查询表结构
     *
     * @param connection
     * @param schemaName
     * @param tableName
     * @return
     */
    @Override
    public RdbTableInfo describeTable(Connection connection, String schemaName, String tableName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(tableName), "表名不能为空");
        schemaName = PluginUtils.isEmpty(schemaName) ? DEFAULT_SCHEMA : schemaName;
        RdbTableInfo tableInfo = new RdbTableInfo();
        String sql = "SELECT table_schema, table_name, obj_description(pg_class.oid) AS table_comment FROM information_schema.tables " +
                "JOIN pg_class ON information_schema.tables.table_name = pg_class.relname " +
                "WHERE table_schema = '" + schemaName + "' AND table_name = '" + tableName + "'";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            // 填充部分表信息
            if (rs.next()) {
                tableInfo.setSchemaName(rs.getString("table_schema"));
                tableInfo.setTableName(rs.getString("table_name"));
                tableInfo.setComment(rs.getString("table_comment"));
            }
            // 获取列信息
            tableInfo.setColumns(showColumns(connection, schemaName, tableName));
            // 获取索引信息
            tableInfo.setIndexes(showIndexes(connection, schemaName, tableName));
        } catch (Exception e) {
            throw new LcapRdbPluginException("Describe table error", e);
        }
        return tableInfo;
    }

    /**
     * 查询列信息，暂时不包括comment
     *
     * @param connection
     * @param schemaName
     * @param tableName
     * @return
     */
    protected List<RdbColumnInfo> showColumns(Connection connection, String schemaName, String tableName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(tableName), "表名不能为空");
        schemaName = PluginUtils.isEmpty(schemaName) ? DEFAULT_SCHEMA : schemaName;
        List<RdbColumnInfo> columns = new ArrayList<>();
        String sql = "SELECT column_name, udt_name, data_type, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale " +
                "FROM information_schema.columns AS cols " +
                "WHERE table_schema='"+ schemaName +"' AND table_name='" + tableName + "' ORDER BY ordinal_position;";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            Set<String> primaryKeys = getPrimaryKeys(connection, schemaName, tableName);
            while (rs.next()) {
                RdbColumnInfo columnInfo = new RdbColumnInfo();
                String columnName = rs.getString("column_name");
                columnInfo.setColumnName(columnName);
                columnInfo.setComment(null);
                columnInfo.setNotNull(rs.getString("is_nullable").equals("NO"));
                // 处理列类型
                String columnType = rs.getString("udt_name");
                TypeEnum typeEnum = TypeEnum.getTypeEnum(columnType);
                if(TypeEnum.CUSTOM_LENGTH_LIST.contains(typeEnum)){
                    int columnSize = rs.getInt("character_maximum_length");
                    if (columnSize == Integer.MAX_VALUE || columnSize == 0) {
                        columnType = typeEnum.getName();
                    } else {
                        columnType = typeEnum.getName() + "(" + columnSize + ")";
                    }
                } else if (TypeEnum.DECIMAL.equals(typeEnum)) {
                    int precision = rs.getInt("numeric_precision");
                    if (precision > 0) {
                        int scale = rs.getInt("numeric_scale");
                        columnType = typeEnum.getName() + "(" + precision + "," + scale + ")";
                    } else {
                        columnType = typeEnum.getName();
                    }
                } else {
                    columnType = typeEnum.equals(TypeEnum.UNKNOWN) ? columnType.toLowerCase() : typeEnum.getName();
                }
                columnInfo.setColumnType(columnType);
                // 处理默认值
                String defaultValue = rs.getString("column_default");
                if(!PluginUtils.isEmpty(defaultValue) && defaultValue.startsWith("nextval('") && defaultValue.endsWith("'::regclass)")) {
                    // 默认值为nextval('sequence_name'::regclass)的，需要特殊处理
                    columnInfo.setDefaultValue(null);
                } else if (!PluginUtils.isEmpty(defaultValue) && defaultValue.matches("'.*?'::[a-z\\s]+")) {
                    // 默认值为'xxx'::type，需要去掉::type
                    columnInfo.setDefaultValue(defaultValue.substring(1, defaultValue.indexOf("'::")));
                } else {
                    columnInfo.setDefaultValue(defaultValue);
                }
                columnInfo.setPrimaryKey(primaryKeys.contains(columnName));
                columns.add(columnInfo);
            }
        } catch (Exception e) {
            throw new LcapRdbPluginException("Show columns error", e);
        }
        return columns;
    }

    /**
     * 查询schema下的所有sequence
     *
     * @param connection
     * @param schemaName
     * @return
     */
    @Override
    public List<RdbSequenceInfo> showSequences(Connection connection, String schemaName) {
        List<RdbSequenceInfo> sequences = new ArrayList<>();
        schemaName = PluginUtils.isEmpty(schemaName) ? DEFAULT_SCHEMA : schemaName;
        String sql = "SELECT sequence_name,minimum_value,maximum_value,increment FROM information_schema.sequences WHERE sequence_schema = '" + schemaName + "';";
        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                RdbSequenceInfo rdbSequenceInfo = new RdbSequenceInfo();
                String sequenceName = rs.getString("sequence_name");
                rdbSequenceInfo.setSequenceName(sequenceName);
                rdbSequenceInfo.setMinValue(rs.getString("minimum_value"));
                rdbSequenceInfo.setMaxValue(rs.getString("maximum_value"));
                rdbSequenceInfo.setIncrementBy(rs.getString("increment"));
                String valueSql = "SELECT last_value FROM " + wrapTableName(schemaName, sequenceName);
                PreparedStatement valuePs = connection.prepareStatement(valueSql);
                ResultSet valueRs = valuePs.executeQuery();
                if (valueRs.next()) {
                    rdbSequenceInfo.setLastNumber(valueRs.getString("last_value"));
                }
                valueRs.close();
                sequences.add(rdbSequenceInfo);
            }
        } catch (Exception e) {
            throw new LcapRdbPluginException("Show sequence error", e);
        }
        return sequences;
    }

    /**
     * 创建数据库
     * @param databaseName
     */
    @Override
    public String toCreateDatabaseSql(String databaseName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(databaseName), "数据库名称不能为空");
        return "CREATE DATABASE " + wrapKeyword(databaseName) + ";\n";
    }

    /**
     * 删除数据库
     * @param databaseName
     */
    @Override
    public String toDeleteDatabaseSql(String databaseName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(databaseName), "数据库名称不能为空");
        return "DROP DATABASE IF EXISTS " + wrapKeyword(databaseName) + ";\n";
    }

    /**
     * 数据库清空表DDL语句
     * @param rdbTableInfo
     * @return
     */
    @Override
    public String toTruncateTableSql(RdbTableInfo rdbTableInfo) {
        return "TRUNCATE TABLE " + wrapTableName(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName()) + ";\n";
    }

    /**
     * 转换为建表DML
     *
     * @return
     */
    @Override
    public String toCreateTableSql(RdbTableInfo tableMetaInfo) {
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        String tableName = wrapTableName(schemaName, tableMetaInfo.getTableName());
        PluginUtils.precondition(!PluginUtils.isEmpty(tableMetaInfo.getColumns()), "表结构不能为空");
        List<RdbColumnInfo> columns = tableMetaInfo.getColumns();
        List<RdbIndexInfo> indexes = Optional.ofNullable(tableMetaInfo.getIndexes()).orElseGet(ArrayList::new);

        StringBuilder sqlBuilder = new StringBuilder("CREATE TABLE ");
        sqlBuilder.append(tableName).append(" (\n");

        String hyper = "";
        // 添加列
        for (RdbColumnInfo column : columns) {
            sqlBuilder.append(hyper).append(wrapKeyword(column.getColumnName())).append(" ").append(column.getColumnType(this))
                    .append(null != column.getNotNull() && column.getNotNull() ? " NOT NULL" : "")
                    .append(toColumnDefaultValue(tableMetaInfo.getTableName(), column));
            hyper = ",\n";
        }
        Set<String> primaryKeys = columns.stream()
                .filter(rdbColumnInfo -> Boolean.TRUE.equals(rdbColumnInfo.getPrimaryKey())).map(RdbColumnInfo::getColumnName).collect(Collectors.toSet());
        // 添加主键
        if (!PluginUtils.isEmpty(primaryKeys)) {
            sqlBuilder.append(hyper).append("PRIMARY KEY (").append(primaryKeys
                    .stream().map(this::wrapKeyword)
                    .collect(Collectors.joining(","))).append(")");
        }
        sqlBuilder.append("\n);\n");
        // 添加自增字段
        List<RdbColumnInfo> autoIncrementKeys = columns.stream()
                .filter(rdbColumnInfo -> Boolean.TRUE.equals(rdbColumnInfo.getAutoIncrement())).collect(Collectors.toList());
        for (RdbColumnInfo column : autoIncrementKeys) {
            PluginUtils.precondition(!PluginUtils.isEmpty(column.getSequenceName()), String.format("设置列自增必须通过序列，列【{%s}】序列名不能为空", column.getColumnName()));
            sqlBuilder.append("CREATE SEQUENCE ").append(wrapKeyword(schemaName)).append(".").append(wrapKeyword(column.getSequenceName()))
                    .append(" START WITH ").append(1).append(" INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;\n");
        }
        // 字段的comment特殊处理
        for (RdbColumnInfo column : columns) {
            sqlBuilder.append(commentOnColumn(tableMetaInfo, column));
        }
        // 添加索引
        for (RdbIndexInfo index : indexes) {
            // 如果索引的列和主键一致，则不需要创建索引
            List<String> indexColumns = index.getColumnNames();
            if(!PluginUtils.isEmpty(indexColumns) && indexColumns.size() == primaryKeys.size() && primaryKeys.containsAll(indexColumns)) {
                continue;
            }
            sqlBuilder.append(toAddTableIndexSql(tableMetaInfo, index));
        }
        // 表的comment特殊处理
        sqlBuilder.append(commentOnTable(tableMetaInfo));

        return sqlBuilder.toString();
    }

    /**
     * 转换为删除表DML
     *
     * @return
     */
    @Override
    public String toDropTableSql(RdbTableInfo tableMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("DROP TABLE IF EXISTS ");
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        sqlBuilder.append(wrapTableName(schemaName, tableMetaInfo.getTableName())).append(" CASCADE;\n");
        return sqlBuilder.toString();
    }

    /**
     * 转换为重命名表DML
     *
     * @return
     */
    @Override
    public String toRenameTableSql(RdbTableInfo tableMetaInfo, RdbTableInfo newTableMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        sqlBuilder.append(wrapTableName(schemaName, tableMetaInfo.getTableName()));
        sqlBuilder.append(" RENAME TO ");
        sqlBuilder.append(wrapKeyword(newTableMetaInfo.getTableName()));
        sqlBuilder.append(";\n");
        return sqlBuilder.toString();
    }

    /**
     * 转换为添加表字段的DML
     *
     * @return
     */
    @Override
    public String toAddTableColumnSql(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo) {
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapTableName(schemaName, tableMetaInfo.getTableName()))
                .append(" ADD COLUMN ").append(wrapKeyword(columnMetaInfo.getColumnName())).append(" ").append(columnMetaInfo.getColumnType(this))
                .append(Boolean.TRUE.equals(columnMetaInfo.getNotNull()) ? " NOT NULL" : "")
                .append(toColumnDefaultValue(tableMetaInfo.getTableName(), columnMetaInfo))
                .append(";\n")
                .append(commentOnColumn(tableMetaInfo, columnMetaInfo));
        return sqlBuilder.toString();
    }

    /**
     * 转换为删除表字段DML
     *
     * @return
     */
    @Override
    public String toDropTableColumnSql(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo) {
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapTableName(schemaName, tableMetaInfo.getTableName()))
                .append(" DROP COLUMN ").append(wrapKeyword(columnMetaInfo.getColumnName()))
                .append(";\n");
        return sqlBuilder.toString();
    }

    /**
     * 转换为修改表字段DML
     * <p>
     * 注意版本9.2及以前的版本不支持在修改字段语句中同时执行多个操作，比如修改字段类型、是否为空、默认值等，只能执行一项操作，因此需要多个sql语句
     *
     * @param tableMetaInfo
     * @param columnMetaInfo
     * @param newColumnMetaInfo
     * @return
     */
    @Override
    public String toAlterTableColumnSql(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo, RdbColumnInfo newColumnMetaInfo) {
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        String tableName = wrapTableName(schemaName, tableMetaInfo.getTableName());
        String oldColumnName = wrapKeyword(columnMetaInfo.getColumnName());
        String columnName = wrapKeyword(newColumnMetaInfo.getColumnName());
        StringBuilder sqlBuilder = new StringBuilder();
        // 如果字段名不一致，则先重命名字段
        if (!columnMetaInfo.getColumnName().equals(newColumnMetaInfo.getColumnName())) {
            sqlBuilder.append("ALTER TABLE ").append(tableName).append(" RENAME COLUMN ")
                    .append(oldColumnName).append(" TO ").append(columnName).append(";\n");
        }
        String prefix = "ALTER TABLE " + tableName + " ALTER COLUMN " + columnName + " ";
        sqlBuilder.append(prefix).append("TYPE ").append(newColumnMetaInfo.getColumnType(this))
                // 如果字段类型不一致，则使用类型转换
                .append(" USING ").append(columnName).append("::").append(newColumnMetaInfo.getColumnType(this)).append(";\n")
                .append(Boolean.TRUE.equals(newColumnMetaInfo.getNotNull()) ? prefix + "SET NOT NULL;\n" : prefix + "DROP NOT NULL;\n")
                .append(PluginUtils.isEmpty(newColumnMetaInfo.getComment()) ? "" : commentOnColumn(tableMetaInfo, newColumnMetaInfo));
        String defaultValue = toColumnDefaultValue(tableMetaInfo.getTableName(), newColumnMetaInfo);
        if (!PluginUtils.isEmpty(defaultValue)) {
            sqlBuilder.append(prefix).append("SET ").append(defaultValue).append(";\n");
        }
        return sqlBuilder.toString();
    }

    /**
     * 转换为添加表索引DML
     *
     * @return
     */
    @Override
    public String toAddTableIndexSql(RdbTableInfo tableMetaInfo, RdbIndexInfo indexMetaInfo) {
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE ").append(Boolean.TRUE.equals(indexMetaInfo.getUnique()) ? "UNIQUE " : "")
                .append("INDEX ").append(wrapKeyword(indexMetaInfo.getIndexName())).append(" ON ")
                .append(wrapTableName(schemaName, tableMetaInfo.getTableName()))
                .append("(").append(indexMetaInfo.getColumnNames()
                        .stream()
                        .map(this::wrapKeyword)
                        .collect(Collectors.joining(","))
                ).append(");\n")
                // comment特殊处理
                .append(commentOnIndex(tableMetaInfo, indexMetaInfo));
        return sqlBuilder.toString();
    }

    /**
     * 转换为添加表注释DML
     *
     * @param tableMetaInfo
     * @return
     */
    private String commentOnTable(RdbTableInfo tableMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder();
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        if (null != tableMetaInfo.getComment()) {
            String comment = dealWithSpecialChar(tableMetaInfo.getComment());
            sqlBuilder.append("COMMENT ON TABLE ").append(wrapTableName(schemaName, tableMetaInfo.getTableName()))
                    .append(" IS '").append(comment).append("';\n");
        }
        return sqlBuilder.toString();
    }

    /**
     * 转换为添加表字段注释DML
     *
     * @param tableMetaInfo
     * @param columnMetaInfo
     * @return
     */
    private String commentOnColumn(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder();
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        if (null != columnMetaInfo.getComment()) {
            String comment = dealWithSpecialChar(columnMetaInfo.getComment());
            sqlBuilder.append("COMMENT ON COLUMN ").append(wrapTableName(schemaName, tableMetaInfo.getTableName()))
                    .append(".").append(wrapKeyword(columnMetaInfo.getColumnName())).append(" IS '").append(comment).append("';\n");


        }
        return sqlBuilder.toString();
    }

    /**
     * 转换为添加表索引注释DML
     *
     * @param tableMetaInfo
     * @param indexMetaInfo
     * @return
     */
    private String commentOnIndex(RdbTableInfo tableMetaInfo, RdbIndexInfo indexMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder();
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        if (null != indexMetaInfo.getComment()) {
            String comment = dealWithSpecialChar(indexMetaInfo.getComment());
            sqlBuilder.append("COMMENT ON INDEX ").append(wrapTableName(schemaName, indexMetaInfo.getIndexName())).append(" IS '")
                    .append(comment).append("';\n");
        }
        return sqlBuilder.toString();
    }

    /**
     * 转换为删除表索引DML
     *
     * @param tableMetaInfo
     * @param indexMetaInfo
     * @return
     */
    @Override
    public String toDropTableIndexSql(RdbTableInfo tableMetaInfo, RdbIndexInfo indexMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("DROP INDEX IF EXISTS ");
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        String indexName = wrapKeyword(schemaName) + "." + wrapKeyword(indexMetaInfo.getIndexName());
        sqlBuilder.append(indexName).append(";\n");
        return sqlBuilder.toString();
    }

    /**
     * 转换为重命名表索引DML
     *
     * @param tableMetaInfo
     * @param oldIndexMetaInfo
     * @param newIndexMetaInfo
     * @return
     */
    @Override
    public String toRenameTableIndexSql(RdbTableInfo tableMetaInfo, RdbIndexInfo oldIndexMetaInfo, RdbIndexInfo newIndexMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER INDEX ");
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        String oldIndexName = wrapKeyword(schemaName) + "." + wrapKeyword(oldIndexMetaInfo.getIndexName());
        sqlBuilder.append(oldIndexName).append(" RENAME TO ")
                .append(wrapKeyword(newIndexMetaInfo.getIndexName()))
                .append(";\n");
        return sqlBuilder.toString();
    }

    /**
     * 生成自增主键DDL语句
     *
     * @param tableMetaInfo
     * @param columnMetaInfo
     * @param startValue
     * @param exists
     * @return
     */
    @Override
    public String toSetAutoIncrement(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo, long startValue, boolean exists) {
        PluginUtils.precondition(!PluginUtils.isEmpty(columnMetaInfo.getSequenceName()),
                String.format("表%s字段%s的sequenceName属性不能为空", tableMetaInfo.getTableName(), columnMetaInfo.getColumnName()));
        String schemaName = PluginUtils.isEmpty(tableMetaInfo.getSchemaName()) ? DEFAULT_SCHEMA : tableMetaInfo.getSchemaName();
        String sequenceName = columnMetaInfo.getSequenceName();
        StringBuilder sqlBuilder = new StringBuilder();
        if(!exists) {
            sqlBuilder.append("CREATE SEQUENCE ").append(wrapKeyword(schemaName)).append(".").append(wrapKeyword(sequenceName))
                    .append(" START WITH ").append(startValue).append(" INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;\n");
        } else {
            sqlBuilder.append("ALTER SEQUENCE ").append(wrapKeyword(schemaName)).append(".").append(wrapKeyword(sequenceName))
                    .append(" RESTART WITH ").append(startValue).append(" INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;\n");
        }
        return sqlBuilder.toString();
    }

    /**
     * 处理列的默认值
     * @param tableName
     * @param column
     * @return
     */
    private String toColumnDefaultValue(String tableName, RdbColumnInfo column) {
        if (PluginUtils.isEmpty(column.getDefaultValue())) {
            return "";
        }
        TypeEnum typeEnum = TypeEnum.getTypeEnum(column.getColumnType(this));
        String defaultValue = column.getDefaultValue();
        if (PluginUtils.isEmpty(defaultValue)) {
            if(TypeEnum.TIMESTAMP.equals(typeEnum)) {
                if (Boolean.TRUE.equals(column.getNotNull())) {
                    return " DEFAULT CURRENT_TIMESTAMP";
                } else {
                    return " DEFAULT NULL";
                }
            }
            return "";
        }
        if (TypeEnum.DATE_TYPE_LIST.contains(typeEnum)) {
            String format = DEFAULT_DATETIME_FORMAT;
            switch (typeEnum) {
                case DATE:
                    format = DEFAULT_DATE_FORMAT;
                    break;
                case TIME:
                    format = DEFAULT_TIME_FORMAT;
                    break;
                case TIMESTAMP:
                    for (String func : DEFAULT_DATETIME_FUNCTION_LIST) {
                        if (func.equalsIgnoreCase(defaultValue)) {
                            return " DEFAULT " + func;
                        }
                    }
                    format = DEFAULT_DATETIME_FORMAT;
                    break;
                default:
                    break;
            }
            try {
                LocalDateTime.parse(column.getDefaultValue(), DateTimeFormatter.ofPattern(format));
                return " DEFAULT '" + defaultValue + "'";
            } catch (Exception e) {
                throw new LcapRdbPluginException(String.format("表[%s]的日期字段[%s]默认值[%s]的类型格式和字段类型不一致", tableName, column.getColumnName(), defaultValue));
            }
        } else if(TypeEnum.NUMERIC_TYPE_LIST.contains(typeEnum)) {
            return " DEFAULT " + defaultValue;
        } else if(TypeEnum.BIG_TYPE_LIST.contains(typeEnum)) {
            return "";
        } else if(TypeEnum.BOOLEAN.equals(typeEnum)) {
            switch (defaultValue){
                case "TRUE":
                case "true":
                case "t":
                case "1":
                    return " DEFAULT true";
                default:
                    return " DEFAULT false";
            }
        }
        return " DEFAULT '" + dealWithSpecialChar(defaultValue) + "'";
    }

    /**
     * 转换为插入DDL
     *
     * @param insertData
     * @return
     */
    @Override
    public RdbDmlPrepareSql toInsertSql(RdbInsertParam insertData) {
        // 自定义的sql不作处理
        if (!PluginUtils.isEmpty(insertData.getSql())) {
            return new RdbDmlPrepareSql(insertData.getSql(), null);
        }
        PluginUtils.precondition(!PluginUtils.isEmpty(insertData.getColumns()), "插入数据不能为空");
        String schemaName = PluginUtils.isEmpty(insertData.getSchemaName()) ? DEFAULT_SCHEMA : insertData.getSchemaName();
        StringBuilder sqlBuilder = new StringBuilder("INSERT INTO ");
        sqlBuilder.append(wrapTableName(schemaName, insertData.getTableName()));
        sqlBuilder.append(" (");
        String hyper = "";
        StringBuilder valuesPlacesHolderBuilder = new StringBuilder();
        List<Object> values = new ArrayList<>(insertData.getColumns().size());
        for (RdbDmlColumnInfo rdbDmlColumnInfo : insertData.getColumns()) {
            sqlBuilder.append(hyper).append(wrapKeyword(rdbDmlColumnInfo.getColumnName()));
            valuesPlacesHolderBuilder.append(hyper).append(wrapValueByType(rdbDmlColumnInfo.getColumnType(this), rdbDmlColumnInfo.getColumnValue()));
            hyper = ",";
        }
        sqlBuilder.append(") VALUES (");
        sqlBuilder.append(valuesPlacesHolderBuilder);
        sqlBuilder.append(")");

        return new RdbDmlPrepareSql(sqlBuilder.toString(), values);
    }

    /**
     * 转换为批量插入DDL
     *
     * @param insertData
     * @param isReplace
     * @return
     */
    @Override
    public RdbDmlPrepareSql toBatchInsertSql(RdbBatchInsertParam insertData, boolean isReplace) {
        // 自定义的sql不作处理
        if (!PluginUtils.isEmpty(insertData.getSql())) {
            return new RdbDmlPrepareSql(insertData.getSql(), null);
        }
        PluginUtils.precondition(!PluginUtils.isEmpty(insertData.getColumns()), "插入列不能为空");
        String schemaName = PluginUtils.isEmpty(insertData.getSchemaName()) ? DEFAULT_SCHEMA : insertData.getSchemaName();
        StringBuilder sqlBuilder = new StringBuilder("INSERT INTO ");
        sqlBuilder.append(wrapTableName(schemaName, insertData.getTableName()));
        sqlBuilder.append(" (");
        String hyper = "";
        StringBuilder valuesPlacesHolderBuilder = new StringBuilder();
        List<Object> values = new ArrayList<>(insertData.getColumns().size());
        List<RdbDmlColumnInfo> rdbColumnInfoList = insertData.getColumns().get(0);
        for (RdbDmlColumnInfo rdbDmlColumnInfo : rdbColumnInfoList) {
            sqlBuilder.append(hyper).append(wrapKeyword(rdbDmlColumnInfo.getColumnName()));
            hyper = ",";
        }
        hyper = "";
        for (List<RdbDmlColumnInfo> columns : insertData.getColumns()) {
            for (RdbDmlColumnInfo column : columns) {
                valuesPlacesHolderBuilder.append(hyper);
                if (isReplace) {
                    valuesPlacesHolderBuilder.append(wrapValueByType(column.getColumnType(this), column.getColumnValue()));
                } else {
                    valuesPlacesHolderBuilder.append("?");
                }
                hyper = ",";
            }
            hyper = "),(";
        }
        sqlBuilder.append(") VALUES (");
        sqlBuilder.append(valuesPlacesHolderBuilder);
        sqlBuilder.append(")");

        return new RdbDmlPrepareSql(sqlBuilder.toString(), values);
    }

    /**
     * 转换为更新DDL
     *
     * @param updateData
     * @return
     */
    @Override
    public RdbDmlPrepareSql toUpdateSql(RdbUpdateParam updateData) {
        // 自定义的sql不作处理
        if (!PluginUtils.isEmpty(updateData.getSql())) {
            return new RdbDmlPrepareSql(updateData.getSql(), null);
        }

        String schemaName = PluginUtils.isEmpty(updateData.getSchemaName()) ? DEFAULT_SCHEMA : updateData.getSchemaName();
        StringBuilder sqlBuilder = new StringBuilder("UPDATE ");
        sqlBuilder.append(wrapTableName(schemaName, updateData.getTableName()));
        sqlBuilder.append(" SET ");
        String hyper = "";
        List<Object> values = new ArrayList<>();
        for (RdbDmlColumnInfo columnInfo : updateData.getColumns()) {
            sqlBuilder.append(hyper).append(wrapKeyword(columnInfo.getColumnName())).append(" = ");
            sqlBuilder.append(wrapValueByType(columnInfo.getColumnType(this), columnInfo.getColumnValue()));
            hyper = ",";
        }

        // 处理条件
        if(null != updateData.getWheres()) {
            sqlBuilder.append(" WHERE ").append(handleWhereCondition(updateData.getWheres(), values));
        }

        return new RdbDmlPrepareSql(sqlBuilder.toString(), values);
    }

    /**
     * 转换为删除DDL
     *
     * @param deleteData
     * @return
     */
    @Override
    public RdbDmlPrepareSql toDeleteSql(RdbDeleteParam deleteData) {
        // 自定义的sql不作处理
        if (!PluginUtils.isEmpty(deleteData.getSql())) {
            return new RdbDmlPrepareSql(deleteData.getSql(), null);
        }

        StringBuilder sqlBuilder = new StringBuilder("DELETE FROM ");
        String schemaName = PluginUtils.isEmpty(deleteData.getSchemaName()) ? DEFAULT_SCHEMA : deleteData.getSchemaName();
        sqlBuilder.append(wrapTableName(schemaName, deleteData.getTableName()));

        // 处理条件
        List<Object> values = new ArrayList<>();
        if(null != deleteData.getWheres()) {
            sqlBuilder.append(" WHERE ").append(handleWhereCondition(deleteData.getWheres(), values));
        }

        return new RdbDmlPrepareSql(sqlBuilder.toString(), values);
    }

    /**
     * 转换为查询DDL
     *
     * @param selectData
     * @return
     */
    @Override
    public RdbDmlPrepareSql toSelectSql(RdbSelectParam selectData) {
        StringBuilder sqlBuilder = new StringBuilder("SELECT ");
        List<Object> values = new ArrayList<>();
        // 处理聚合函数
        if (!PluginUtils.isEmpty(selectData.getAggregation())) {
            AggregationEnum aggregationEnum = AggregationEnum.getAggregationEnum(selectData.getAggregation());
            switch (aggregationEnum) {
                case COUNT:
                    sqlBuilder.append(selectData.getAggregation()).append("( ");
                    break;
                case AVG:
                case MAX:
                case MIN:
                case SUM:
                    PluginUtils.precondition(!PluginUtils.isEmpty(selectData.getColumns()) && selectData.getColumns().size() == 1,
                            "聚合函数'" + aggregationEnum.getAggregation() + "'只能指定单列");
                    sqlBuilder.append(selectData.getAggregation()).append("( ");
                    break;
                case COUNT_DISTINCT:
                    PluginUtils.precondition(!PluginUtils.isEmpty(selectData.getColumns()),
                            "聚合函数'" + aggregationEnum.getAggregation() + "'必须指定列");
                    sqlBuilder.append("COUNT( DISTINCT ");
                    break;
                case UNKNOWN:
                default:
                    throw new LcapRdbPluginException("不支持的聚合函数类型");
            }
        }
        // 处理列
        if (PluginUtils.isEmpty(selectData.getColumns())) {
            sqlBuilder.append("*");
        } else {
            String hyper = "";
            for (RdbDmlColumnInfo columnInfo : selectData.getColumns()) {
                sqlBuilder.append(hyper).append(wrapKeyword(columnInfo.getColumnName()));
                hyper = ",";
            }
        }
        // 处理聚合函数
        if (!PluginUtils.isEmpty(selectData.getAggregation())) {
            AggregationEnum aggregationEnum = AggregationEnum.getAggregationEnum(selectData.getAggregation());
            sqlBuilder.append(" ) AS ").append(aggregationEnum.getAlias());
        }
        sqlBuilder.append(" FROM ");
        // 处理子查询，子查询需要加上别名
        if(!PluginUtils.isEmpty(selectData.getSql())) {
            sqlBuilder.append("(").append(selectData.getSql()).append(")").append(" AS ").append("table_").append(RandomUtils.generateStr(10));
            if (!PluginUtils.isEmpty(selectData.getVariables())) {
                values.addAll(selectData.getVariables());
            }
        } else {
            String schemaName = PluginUtils.isEmpty(selectData.getSchemaName()) ? DEFAULT_SCHEMA : selectData.getSchemaName();
            sqlBuilder.append(wrapTableName(schemaName, selectData.getTableName()));
        }

        // 处理 WHERE 条件
        if (selectData.getWheres() != null) {
            sqlBuilder.append(" WHERE ").append(handleWhereCondition(selectData.getWheres(), values));
        }

        // 添加 ORDER BY 子句
        sqlBuilder.append(wrapOrderBy(selectData.getOrderBys()));

        // 添加 LIMIT 子句
        String resultSql = wrapLimitClause(sqlBuilder.toString(), selectData.getOffset(), selectData.getLimit());
        return new RdbDmlPrepareSql(resultSql, values);
    }

    @Override
    protected String handleWhereCondition(DmlWhereCondition wheres, List<Object> placeHolderValues) {
        if (null == wheres) {
            return "";
        }

        StringBuilder sqlBuilder = new StringBuilder();

        if (wheres instanceof DmlAndCondition) {
            sqlBuilder.append("(").append(handleWhereCondition(((DmlAndCondition) wheres).getLeft(), placeHolderValues)).append(")");
            sqlBuilder.append(" AND ");
            sqlBuilder.append("(").append(handleWhereCondition(((DmlAndCondition) wheres).getRight(), placeHolderValues)).append(")");
        } else if (wheres instanceof DmlOrCondition) {
            sqlBuilder.append("(").append(handleWhereCondition(((DmlOrCondition) wheres).getLeft(), placeHolderValues)).append(")");
            sqlBuilder.append(" OR ");
            sqlBuilder.append("(").append(handleWhereCondition(((DmlOrCondition) wheres).getRight(), placeHolderValues)).append(")");
        } else if (wheres instanceof DmlEqualsCondition) {
            sqlBuilder.append(handleWhereCondition(((DmlEqualsCondition) wheres).getLeft(), placeHolderValues));
            sqlBuilder.append(" = ");
            sqlBuilder.append(handleWhereCondition(((DmlEqualsCondition) wheres).getRight(), placeHolderValues));
        } else if (wheres instanceof DmlLikeCondition) {
            DmlLikeCondition dmlLikeCondition = (DmlLikeCondition) wheres;
            PluginUtils.precondition(dmlLikeCondition.getLeft() instanceof DmlColumnCondition, "like condition left must be column condition");
            sqlBuilder.append(handleWhereCondition(dmlLikeCondition.getLeft(), placeHolderValues));
            sqlBuilder.append(" like ");
            PluginUtils.precondition(dmlLikeCondition.getRight() instanceof DmlValueCondition, "like condition right must be value condition");
            String value = (String) ((DmlValueCondition) dmlLikeCondition.getRight()).getValue();
            sqlBuilder.append(wrapStringValue("%" + value + "%"));
        } else if (wheres instanceof DmlUnaryCustomCondition) {
            DmlUnaryCustomCondition dmlUnaryCustomCondition = (DmlUnaryCustomCondition) wheres;
            PluginUtils.precondition(dmlUnaryCustomCondition.getLeft() instanceof DmlColumnCondition, "unary custom condition left must be column condition");
            sqlBuilder.append(handleWhereCondition(dmlUnaryCustomCondition.getLeft(), placeHolderValues));
            sqlBuilder.append(" ").append(dmlUnaryCustomCondition.getCustomOperator()).append(" ");
            PluginUtils.precondition(dmlUnaryCustomCondition.getRight() instanceof DmlValueCondition, "unary custom condition right must be value condition");
            sqlBuilder.append(handleWhereCondition(dmlUnaryCustomCondition.getRight(), placeHolderValues));
        } else if (wheres instanceof DmlInCondition) {
            DmlInCondition dmlInCondition = (DmlInCondition) wheres;
            sqlBuilder.append(handleWhereCondition(dmlInCondition.getLeft(), placeHolderValues));
            sqlBuilder.append(" IN ");
            if (dmlInCondition.getRight() instanceof DmlValueCondition) {
                DmlValueCondition valueCondition = (DmlValueCondition) dmlInCondition.getRight();
                PluginUtils.precondition(valueCondition.getValue() instanceof List, "in条件右边需要是个list");
                List valueList = (List) valueCondition.getValue();
                sqlBuilder.append("(");
                String hyper = "";
                for(Object value : valueList) {
                    sqlBuilder.append(hyper).append(wrapValueByType(valueCondition.getColumnType(this), value));
                    hyper = ",";
                }
                sqlBuilder.append(")");
            } else {
                sqlBuilder.append(handleWhereCondition(((DmlEqualsCondition) wheres).getRight(), placeHolderValues));
            }
        } else if (wheres instanceof DmlColumnCondition) {
            sqlBuilder.append(wrapKeyword(((DmlColumnCondition) wheres).getColumnName()));
        } else if (wheres instanceof DmlValueCondition) {
            DmlValueCondition valueCondition = (DmlValueCondition) wheres;
            sqlBuilder.append(wrapValueByType(valueCondition.getColumnType(this), valueCondition.getValue()));
        }

        return sqlBuilder.toString();
    }

    /**
     * 根据列的类型，转换为对应的值
     * @param columnType
     * @param columnValue
     * @return
     */
    private String wrapValueByType(String columnType, Object columnValue) {
        if (columnValue == null) {
            return "null";
        }
        String valueStr = String.valueOf(columnValue);
        TypeEnum typeEnum = TypeEnum.getTypeEnum(columnType);
        // 如果是空字符串，且不是字符串类型，则返回null
        if(PluginUtils.isEmpty(valueStr) && !TypeEnum.STRING_TYPE_LIST.contains(typeEnum)) {
            return "null";
        }
        switch (typeEnum) {
            case BOOLEAN:
                if ("true".equalsIgnoreCase(valueStr) || "1".equals(valueStr) || "t".equalsIgnoreCase(valueStr)
                        || "yes".equalsIgnoreCase(valueStr) || "y".equals(valueStr) || "on".equalsIgnoreCase(valueStr)) {
                    return "true";
                } else {
                    return "false";
                }
            case VARCHAR:
            case TEXT:
            case CHAR:
                return wrapValueString(dealWithSpecialChar(valueStr));
            case DATE:
            case TIME:
            case TIMESTAMP:
            case UNKNOWN:
                return wrapValueString(valueStr);
            case BYTEA:
                return wrapBinaryValue(valueStr);
            default:
                return valueStr;
        }
    }

    /**
     * 处理值类型字符串，一般需要在sql中加上引号
     *
     * @param str
     * @return
     */
    private String wrapValueString(String str) {
        return "'" + str + "'";
    }

    /**
     * 处理表名，比如有些表名需要加上schema
     *
     * @return
     */
    @Override
    public String wrapTableName(String schemaName, String tableName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(tableName), "表名不能为空");
        return (PluginUtils.isEmpty(schemaName) ? "" : wrapKeyword(schemaName) + ".") + wrapKeyword(tableName);
    }

    /**
     * 处理主键
     *
     * @return
     */
    @Override
    public String wrapSelectKey(String schema, String tableName, String sequence, String primaryKey, String propertyName) {
        schema = PluginUtils.isEmpty(schema) ? DEFAULT_SCHEMA : schema;
        return "SELECT NEXTVAL('" + wrapKeyword(schema) + "." + wrapKeyword(sequence) + "') AS " + wrapKeyword(propertyName);
    }

    @Override
    public String wrapBooleanValue(Boolean value) {
        if (value == null) {
            return null;
        }
        return String.valueOf(value);
    }

    /**
     * 包装二进制值
     *
     * @param value
     * @return
     */
    @Override
    public String wrapBinaryValue(String value) {
        if (PluginUtils.isEmpty(value)) {
            return null;
        }
        return "E'\\\\x" + value + "'";
    }

    /**
     * 处理关键字，比如mysql是`xxxx`，oracle是"xxxxx"
     *
     * @param str
     * @return
     */
    @Override
    public String wrapKeyword(String str) {
        return "\"" + str + "\"";
    }

    /**
     * 处理翻页语句，比如mysql是xxxx limit x, y;oracle需要根据rownum过滤
     *
     * @param orderBys
     * @return
     */
    private String wrapOrderBy(List<RdbDmlOrderBy> orderBys) {
        StringBuilder sqlBuilder = new StringBuilder();
        if (!PluginUtils.isEmpty(orderBys)) {
            sqlBuilder.append(" ORDER BY ");
            String hyper = "";
            for (RdbDmlOrderBy orderBy : orderBys) {
                sqlBuilder.append(hyper).append(wrapKeyword(orderBy.getColumnName())).append(" ").append(orderBy.getOrderType());
                hyper = ", ";
            }
        }
        return sqlBuilder.toString();
    }

    /**
     * 处理翻页语句，比如mysql是xxxx limit x, y;oracle需要根据rownum过滤
     *
     * @param sql
     * @param offset
     * @param size
     * @return
     */
    @Override
    public String wrapLimitClause(String sql, String offset, String size) {
        if(sql.contains("LIMIT") || sql.contains("limit") || sql.contains("OFFSET") || sql.contains("offset")) {
            sql = "SELECT * FROM (" + sql + ") AS alias001";
        }
        return sql + (size == null ? "" : " LIMIT " + size) + (offset == null ? "" : " OFFSET " + offset);
    }

    /**
     * 处理特殊字符，比如mysql是'，而oracle是''
     * @param str
     * @return
     */
    @Override
    public String dealWithSpecialChar(String str) {
        if (PluginUtils.isEmpty(str)) {
            return str;
        }
        return str.replace("'", "''")
                .replace("\0", "\\0");
    }

    /**
     * 获取表的物理内存大小，单位字节
     *
     * @param connection
     * @param schemaName
     * @param tableName
     * @return
     */
    @Override
    public long tableSize(Connection connection, String schemaName, String tableName) {
        throw new LcapRdbPluginException("Postgresql插件暂时不支持获取表的物理内存大小");
    }

    @Override
    public String wrapConcatFunction(String... strings) {
        if (strings == null) {
            return null;
        } else if (strings.length == 1) {
            return strings[0];
        } else {
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append("concat(");
            String hyper = "";
            for (String str : strings) {
                // 这里需要强转字符串，否则可能会报错
                sqlBuilder.append(hyper).append(str).append("::text");
                hyper = ", ";
            }
            sqlBuilder.append(")");
            return sqlBuilder.toString();
        }
    }

    /**
     * 包装函数，这里接受MySQL的函数名和语法，转换为对应的函数名和语法
     *
     * @param functionName 函数名
     * @param keywords     关键字
     * @param arguments    参数
     * @return
     */
    @Override
    public String wrapFunction(String functionName, List<String> keywords, List<String> arguments) {
        PluginUtils.precondition(!PluginUtils.isEmpty(functionName), "函数名不能为空");
        String function = functionName.toUpperCase();
        String functionResult = null;
        if (PostgresqlFunction.FUNCTION_MAP.containsKey(function)) {
            String template = PostgresqlFunction.FUNCTION_MAP.get(function);
            switch (function) {
                // 需要特殊处理的函数
                case "COALESCE":
                    functionResult = PostgresqlFunction.wrapCoalesceFunction(arguments);
                    break;
                case "GROUP_CONCAT":
                    functionResult = PostgresqlFunction.wrapGroupConcatFunction(keywords, arguments);
                    break;
                // 聚合参数
                case "AVG":
                case "MAX":
                case "MIN":
                case "COUNT":
                case "SUM":
                    functionResult = PostgresqlFunction.wrapAggregateFunction(template, keywords, arguments);
                    break;
                case "NOW":
                    functionResult = template;
                    break;
                case "ASCII":
                case "LENGTH":
                case "CHAR_LENGTH":
                case "DATE":
                case "YEAR":
                case "MONTH":
                case "WEEK":
                case "DAY":
                case "HOUR":
                case "MINUTE":
                case "SECOND":
                case "QUARTER":
                case "LOWER":
                case "UPPER":
                case "TO_DAYS":
                    PluginUtils.precondition(arguments.size() == 1, String.format("函数%s需要一个参数", functionName));
                    functionResult = String.format(template, arguments.get(0));
                    break;
                case "IFNULL":
                case "ROUND":
                case "LEFT":
                case "RIGHT":
                case "TRUNCATE":
                    PluginUtils.precondition(arguments.size() == 2, String.format("函数%s需要两个参数", functionName));
                    functionResult = String.format(template, arguments.get(0), arguments.get(1));
                    break;
                case "INSTR":
                    // 交换位置
                    PluginUtils.precondition(arguments.size() == 2, String.format("函数%s需要两个参数", functionName));
                    functionResult = String.format(template, arguments.get(1), arguments.get(0));
                    break;
                case "DATE_ADD":
                case "DATE_SUB":
                    PluginUtils.precondition(arguments.size() == 2, String.format("函数%s需要两个参数", functionName));
                    functionResult = PostgresqlFunction.wrapDateAddOrSubFunction(template, arguments);
                    break;
                case "DATE_FORMAT":
                case "STR_TO_DATE":
                    PluginUtils.precondition(arguments.size() == 2, String.format("函数%s需要两个参数", functionName));
                    functionResult = String.format(template, arguments.get(0), PostgresqlFunction.handleDateFormat(arguments.get(1)));
                    break;
                case "IF":
                case "SUBSTR":
                case "REPLACE":
                    PluginUtils.precondition(arguments.size() == 3, String.format("函数%s需要三个参数", functionName));
                    functionResult = String.format(template, arguments.get(0), arguments.get(1), arguments.get(2));
                    break;
            }
        }
        return functionResult;
    }

}
