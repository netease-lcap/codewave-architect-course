package com.netease.cloud.lowcode.owl.extension;

import com.netease.cloud.lowcode.owl.enums.TypeEnum;
import com.netease.cloud.lowcode.owl.spi.rdb.AbstractRdbDataSourcePlugin;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.ddl.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.order.RdbDmlOrderBy;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.dml.where.*;
import com.netease.cloud.lowcode.owl.spi.rdb.dto.maven.MavenDependence;
import com.netease.cloud.lowcode.owl.spi.rdb.exception.LcapRdbPluginException;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.AggregationEnum;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.PluginUtils;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.PrivilegeEnum;
import com.netease.cloud.lowcode.owl.spi.rdb.utils.RandomUtils;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Mysql8Plugin extends AbstractRdbDataSourcePlugin {

    private static final String DB_TYPE = "mysql8";

    private static final String JDBC_PREFIX = "jdbc:mysql://";

    private static final String JDBC_SUFFIX = "useUnicode=true&characterEncoding=utf8&useSSL=false&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai&nullCatalogMeansCurrent=true&allowPublicKeyRetrieval=true";

    private static final String MAVEN_DEPENDENCE_GROUP_ID = "mysql";

    private static final String MAVEN_DEPENDENCE_ARTIFACT_ID = "mysql-connector-java";

    private static final String MAVEN_DEPENDENCE_VERSION = "8.0.28";

    private static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    private static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

    private static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    private static final List<String> DEFAULT_DATETIME_FUNCTION_LIST = Arrays.asList("CURRENT_TIMESTAMP", "NOW()");

    // 3072 / 4 = 768，取768
    private static final int DEFAULT_PREFIX_INDEX_LENGTH = 768;

    @Override
    public String dbType() {
        return DB_TYPE;
    }

    @Override
    public String baseOnDbType() {
        return "MySQL";
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
        if (!PluginUtils.isEmpty(dataSourceParam.getDbname())) {
            jdbcBuilder.append("/").append(dataSourceParam.getDbname());
        }
        hyper = "?";
        Map<String, String> customConfigs = dataSourceParam.getCustomConfigs();
        if (customConfigs == null || !customConfigs.containsKey("customSetting")) {
            jdbcBuilder.append(hyper).append(JDBC_SUFFIX);
        } else {
            // 如果有用户自定义的配置，使用用户的配置
            jdbcBuilder.append(hyper).append(customConfigs.get("customSetting"));
        }

        return jdbcBuilder.toString();
    }

    @Override
    public Driver getJdbcDriver(RdbDataSource dataSourceParam) {
        PluginUtils.precondition(DB_TYPE.equals(dataSourceParam.getDbType()), "数据源类型不匹配");
        try {
            return new com.mysql.cj.jdbc.Driver();
        } catch (Exception e) {
            throw new LcapRdbPluginException("Get jdbc driver error", e);
        }
    }

    @Override
    public MavenDependence mavenDependence() {
        MavenDependence mavenDependence = new MavenDependence();
        mavenDependence.setGroupId(MAVEN_DEPENDENCE_GROUP_ID);
        mavenDependence.setArtifactId(MAVEN_DEPENDENCE_ARTIFACT_ID);
        mavenDependence.setVersion(MAVEN_DEPENDENCE_VERSION);
        return mavenDependence;
    }

    @Override
    public List<String> showDatabases(Connection connection) {
        List<String> databaseNames = new ArrayList<>();
        String sql = "SHOW DATABASES";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String dbName = rs.getString(1);
                databaseNames.add(dbName);
            }
        } catch (SQLException e) {
            throw new LcapRdbPluginException(e.getMessage(), e);
        }
        return databaseNames.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList());
    }

    @Override
    public List<String> showTables(Connection connection, String schemaName) {
        List<String> tableNames = new ArrayList<>();
        try {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet rs = metaData.getTables(connection.getCatalog(), null, null, new String[] {"TABLE", "SYSTEM TABLE"});
            while (rs.next()) {
                String tableName = rs.getString("TABLE_NAME");
                tableNames.add(tableName);
            }
        } catch (SQLException e) {
            throw new LcapRdbPluginException(e.getMessage(), e);
        }
        return tableNames.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList());
    }

    @Override
    public List<String> showViews(Connection connection, String schemaName) {
        try {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet resultSet = metaData.getTables(connection.getCatalog(), schemaName, null, new String[] {"VIEW", "SYSTEM VIEW"});
            List<String> viewNames = new ArrayList<>();
            while (resultSet.next()) {
                viewNames.add(resultSet.getString("TABLE_NAME"));
            }
            return viewNames.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList());
        } catch (SQLException e) {
            throw new LcapRdbPluginException("获取视图信息失败", e);
        }
    }

    @Override
    public List<RdbIndexInfo> showIndexes(Connection connection, String schemaName, String tableName) {
        String sql = "SHOW INDEXES FROM " + wrapKeyword(tableName);
        Map<String, RdbIndexInfo> indexMap = new HashMap<>();
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String indexName = rs.getString("Key_name");
                String columnName = rs.getString("Column_name");
                RdbIndexInfo index;
                if (indexMap.containsKey(indexName)) {
                    index = indexMap.get(indexName);
                    List<String> columnNames = index.getColumnNames();
                    columnNames.add(columnName);
                    index.setColumnNames(columnNames);
                } else {
                    index = new RdbIndexInfo();
                    index.setIndexName(indexName);
                    List<String> columnNames = new ArrayList<>();
                    columnNames.add(columnName);
                    index.setColumnNames(columnNames);
                    index.setPrimary(indexName.equalsIgnoreCase("PRIMARY"));
                    index.setUnique(rs.getString("Non_unique").equalsIgnoreCase("0"));
                    index.setComment(rs.getString("Index_comment"));
                }
                indexMap.put(indexName, index);
            }
        } catch (SQLException e) {
            throw new LcapRdbPluginException(e.getMessage(), e);
        }
        return new ArrayList<>(indexMap.values());
    }

    @Override
    public RdbTableInfo describeTable(Connection connection, String schemaName, String tableName) {
        RdbTableInfo tableInfo = new RdbTableInfo();
        String sql = "SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '" + tableName + "'";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                tableInfo.setTableName(rs.getString("TABLE_NAME"));
                tableInfo.setComment(rs.getString("TABLE_COMMENT"));
                tableInfo.setColumns(showColumns(connection, tableName));
                tableInfo.setIndexes(showIndexes(connection, schemaName, tableName));
            }
        } catch (SQLException e) {
            throw new LcapRdbPluginException(e.getMessage(), e);
        }
        return tableInfo;
    }

    public List<RdbColumnInfo> showColumns(Connection connection, String tableName) {
        List<RdbColumnInfo> columnInfoList = new ArrayList<>();
        String sql = "SHOW FULL COLUMNS FROM " + wrapKeyword(tableName);
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                RdbColumnInfo columnInfo = new RdbColumnInfo();
                columnInfo.setColumnName(rs.getString("Field"));
                // mysql的类型带有unsigned和zerofill，暂时需要去掉
                String columnType = rs.getString("Type")
                        .replace("unsigned", "").replace("zerofill", "").trim();
                columnInfo.setColumnType(columnType);
                columnInfo.setDefaultValue(rs.getString("Default"));
                columnInfo.setComment(rs.getString("Comment"));
                columnInfo.setPrimaryKey(rs.getString("Key").equalsIgnoreCase("PRI"));
                columnInfo.setNotNull(rs.getString("Null").equalsIgnoreCase("NO"));
                columnInfo.setAutoIncrement(rs.getString("Extra").contains("auto_increment"));
                columnInfoList.add(columnInfo);
            }
        } catch (SQLException e) {
            throw new LcapRdbPluginException(e.getMessage(), e);
        }
        return columnInfoList;
    }

    @Override
    public List<RdbSequenceInfo> showSequences(Connection connection, String schemaName) {
        // mysql不支持sequence
        return new ArrayList<>();
    }

    /**
     * 创建数据库
     *
     * @param databaseName
     */
    @Override
    public String toCreateDatabaseSql(String databaseName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(databaseName), "数据库名称不能为空");
        return "CREATE DATABASE " + wrapKeyword(databaseName) + ";\n";
    }

    /**
     * 删除数据库
     *
     * @param databaseName
     */
    @Override
    public String toDeleteDatabaseSql(String databaseName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(databaseName), "数据库名称不能为空");
        return "DROP DATABASE IF EXISTS " + wrapKeyword(databaseName) + ";\n";
    }

    /**
     * 创建数据库账号
     *
     * @param accountInfo
     */
    @Override
    public String toCreateDbAccountSql(RdbAccountInfo accountInfo) {
        PluginUtils.precondition(!PluginUtils.isEmpty(accountInfo.getDbAccount()), "数据库账号不能为空");
        StringBuilder sqlBuilder = new StringBuilder();
        if (PluginUtils.isEmpty(accountInfo.getWhiteIps())) {
            sqlBuilder.append("CREATE USER '").append(accountInfo.getDbAccount()).append("'@'%' IDENTIFIED BY '")
                    .append(accountInfo.getDbAccountPwd()).append("';\n");
        } else {
            for (String ip : accountInfo.getWhiteIps()) {
                sqlBuilder.append("CREATE USER '").append(accountInfo.getDbAccount()).append("'@'")
                        .append(ip).append("' IDENTIFIED BY '").append(accountInfo.getDbAccountPwd()).append("';\n");
            }
        }
        return sqlBuilder.toString();
    }

    /**
     * 删除数据库账号
     *
     * @param accountInfo
     */
    @Override
    public String toDeleteDbAccountSql(RdbAccountInfo accountInfo) {
        PluginUtils.precondition(!PluginUtils.isEmpty(accountInfo.getDbAccount()), "数据库账号不能为空");
        StringBuilder sqlBuilder = new StringBuilder();
        if(PluginUtils.isEmpty(accountInfo.getWhiteIps())) {
            sqlBuilder.append("DROP USER IF EXISTS '").append(accountInfo.getDbAccount()).append("'@'%';\n");
        } else {
            for (String ip : accountInfo.getWhiteIps()) {
                sqlBuilder.append("DROP USER IF EXISTS '").append(accountInfo.getDbAccount()).append("'@'")
                        .append(ip).append("';\n");
            }
        }
        return sqlBuilder.toString();
    }

    /**
     * 授权
     *
     * @param accountInfo
     */
    @Override
    public String toGrantPrivilegeSql(RdbAccountInfo accountInfo, String databaseName) {
        PluginUtils.precondition(!PluginUtils.isEmpty(databaseName), "数据库名称不能为空");
        PluginUtils.precondition(!PluginUtils.isEmpty(accountInfo.getDbAccount()), "数据库账号不能为空");
        StringBuilder privileges = new StringBuilder();
        boolean flag = false;
        if (PluginUtils.isEmpty(accountInfo.getPrivileges())) {
            privileges.append(PrivilegeEnum.ALL.getPrivilege());
        } else {
            String hyper = "";
            for (String privilege : accountInfo.getPrivileges()) {
                PrivilegeEnum privilegeEnum = PrivilegeEnum.of(privilege);
                if (privilege.equals("ALL") && privilegeEnum.equals(PrivilegeEnum.ALL)) {
                    privileges = new StringBuilder(PrivilegeEnum.ALL.getPrivilege());
                    break;
                }
                if (!PrivilegeEnum.SUPPORT_PRIVILEGE.contains(privilegeEnum)) {
                    throw new LcapRdbPluginException("不支持的权限类型：" + privilege);
                }
                if (privilegeEnum == PrivilegeEnum.SHOW_DATABASES) {
                    flag = true;
                    continue;
                }
                privileges.append(hyper).append(privilegeEnum.getPrivilege());
                hyper = ",";
            }
        }
        String privilege = privileges.toString();
        StringBuilder sqlBuilder = new StringBuilder();
        String suffix = PluginUtils.isEmpty(accountInfo.getDbAccountPwd()) ? "" : " IDENTIFIED BY '" + accountInfo.getDbAccountPwd() + "'";
        if (PluginUtils.isEmpty(accountInfo.getWhiteIps())) {
            sqlBuilder.append("GRANT ").append(privilege).append(" ON ").append(wrapKeyword(databaseName)).append(".* TO '")
                    .append(accountInfo.getDbAccount()).append("'@'%'").append(suffix).append(";\n");
            if (flag) {
                sqlBuilder.append("GRANT ").append(PrivilegeEnum.SHOW_DATABASES.getPrivilege()).append(" ON *.* TO '")
                        .append(accountInfo.getDbAccount()).append("'@'%'").append(suffix).append(";\n");
            }
        }
        for (String ip : accountInfo.getWhiteIps()) {
            sqlBuilder.append("GRANT ").append(privilege).append(" ON ").append(wrapKeyword(databaseName)).append(".* TO '")
                    .append(accountInfo.getDbAccount()).append("'@'").append(ip).append("'").append(suffix).append(";\n");
            if (flag) {
                sqlBuilder.append("GRANT ").append(PrivilegeEnum.SHOW_DATABASES.getPrivilege()).append(" ON *.* TO '")
                        .append(accountInfo.getDbAccount()).append("'@'").append(ip).append("'").append(suffix).append(";\n");
            }
        }
        sqlBuilder.append("FLUSH PRIVILEGES;\n");
        return sqlBuilder.toString();
    }

    /**
     * 查询数据库账户信息，包括账户名、密码、白名单ip等
     * @param connection
     * @param schemaName
     * @param username
     * @return
     */
    @Override
    public RdbAccountInfo showAccountInfo(Connection connection, String schemaName, String username) {
        RdbAccountInfo accountInfo = new RdbAccountInfo();
        List<String> whiteIps = new ArrayList<>();
        // 需要查询账号名和白名单ip，权限暂时不需要
        String sql = "SELECT Host, User FROM mysql.user WHERE User = '" + username + "'";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                whiteIps.add(rs.getString("Host"));
            }
        } catch (Exception e) {
            throw new LcapRdbPluginException("Show account info error", e);
        }
        if (PluginUtils.isEmpty(whiteIps)) {
            throw new LcapRdbPluginException(String.format("不存在用户%s或当前账号无权查询用户信息", username));
        }
        accountInfo.setDbAccount(username);
        accountInfo.setWhiteIps(whiteIps);
        return accountInfo;
    }

    /**
     * 数据库清空表DDL语句
     *
     * @param rdbTableInfo
     * @return
     */
    @Override
    public String toTruncateTableSql(RdbTableInfo rdbTableInfo) {
        return "TRUNCATE TABLE " + wrapTableName(rdbTableInfo.getSchemaName(), rdbTableInfo.getTableName()) + ";\n";
    }

    @Override
    public String toCreateTableSql(RdbTableInfo tableMetaInfo) {
        PluginUtils.precondition(!PluginUtils.isEmpty(tableMetaInfo.getColumns()), "表结构不能为空");

        StringBuilder sqlBuilder = new StringBuilder("CREATE TABLE ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName())).append(" (\n");
        String hyper = "";
        // 添加列
        List<RdbColumnInfo> columns = tableMetaInfo.getColumns();
        for (RdbColumnInfo column : columns) {
            sqlBuilder.append(hyper).append(wrapKeyword(column.getColumnName())).append(" ")
                    .append(column.getColumnType(this))
                    .append(Boolean.TRUE.equals(column.getNotNull()) ? " NOT NULL" : " NULL");
            if (Boolean.TRUE.equals(column.getPrimaryKey()) && Boolean.TRUE.equals(column.getAutoIncrement())) {
                sqlBuilder.append(" AUTO_INCREMENT");
            } else {
                sqlBuilder.append(toColumnDefaultValue(tableMetaInfo.getTableName(), column));
            }
            sqlBuilder.append(!PluginUtils.isEmpty(column.getComment()) ? " COMMENT '" + dealWithSpecialChar(column.getComment()) + "'" : "");
            hyper = ",\n";
        }
        // 添加索引
        List<RdbIndexInfo> indexes = Optional.ofNullable(tableMetaInfo.getIndexes()).orElseGet(ArrayList::new);
        Set<String> primaryKeys = columns.stream()
                .filter(rdbColumnInfo -> Boolean.TRUE.equals(rdbColumnInfo.getPrimaryKey())).map(RdbColumnInfo::getColumnName).collect(Collectors.toSet());
        for (RdbIndexInfo index : indexes) {
            List<String> columnsName = index.getColumnNames();
            if (!PluginUtils.isEmpty(columnsName) && columnsName.size() == primaryKeys.size() && primaryKeys.containsAll(columnsName)) {
                continue;
            }
            boolean flag = needAddPrefixIndexLength(tableMetaInfo, index);
            sqlBuilder.append(hyper).append(Boolean.TRUE.equals(index.getUnique()) ? "UNIQUE " : "")
                    .append("INDEX ").append(wrapKeyword(index.getIndexName())).append("(")
                    .append(index.getColumnNames()
                            .stream()
                            .map(item -> flag ? wrapKeyword(item) + "(" + DEFAULT_PREFIX_INDEX_LENGTH + ")" : wrapKeyword(item))
                            .collect(Collectors.joining(",")))
                    .append(")")
                    .append(PluginUtils.isEmpty(index.getComment()) ? "" : " COMMENT '" + dealWithSpecialChar(index.getComment()) + "'");
        }
        // 添加主键
        if (!PluginUtils.isEmpty(primaryKeys)) {
            sqlBuilder.append(hyper).append("PRIMARY KEY (").append(primaryKeys
                    .stream().map(this::wrapKeyword)
                    .collect(Collectors.joining(","))).append(")");
        }
        sqlBuilder.append("\n)")
                .append(PluginUtils.isEmpty(tableMetaInfo.getComment()) ? "" : " COMMENT='" + dealWithSpecialChar(tableMetaInfo.getComment()) + "'")
                .append(";\n");

        return sqlBuilder.toString();
    }

    private String toColumnDefaultValue(String tableName, RdbColumnInfo column) {
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
                case DATETIME:
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
            } catch (Exception e) {
                throw new LcapRdbPluginException(String.format("表[%s]的日期字段[%s]默认值[%s]的类型格式和字段类型不一致", tableName, column.getColumnName(), defaultValue));
            }
        } else if(TypeEnum.NUMERIC_TYPE_LIST.contains(typeEnum)) {
            return " DEFAULT " + defaultValue;
        } else if(TypeEnum.BOOLEAN.equals(typeEnum)) {
            switch (defaultValue){
                case "TRUE":
                case "true":
                case "1":
                    return " DEFAULT 1";
                default:
                    return " DEFAULT 0";
            }
        } else if(TypeEnum.BIG_TYPE_LIST.contains(typeEnum)) {
            return "";
        }
        return " DEFAULT '" + dealWithSpecialChar(defaultValue) + "'";
    }

    @Override
    public String toDropTableSql(RdbTableInfo tableMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("DROP TABLE IF EXISTS ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName())).append(" CASCADE;\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toRenameTableSql(RdbTableInfo tableMetaInfo, RdbTableInfo newTableMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName()));
        sqlBuilder.append(" RENAME TO ");
        sqlBuilder.append(wrapKeyword(newTableMetaInfo.getTableName()));
        sqlBuilder.append(";\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toAddTableColumnSql(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName()))
                .append(" ADD COLUMN ").append(wrapKeyword(columnMetaInfo.getColumnName()))
                .append(" ").append(columnMetaInfo.getColumnType(this))
                .append(Boolean.TRUE.equals(columnMetaInfo.getNotNull()) ? " NOT NULL" : " NULL")
                .append(toColumnDefaultValue(tableMetaInfo.getTableName(), columnMetaInfo))
                .append(PluginUtils.isEmpty(columnMetaInfo.getComment()) ? " " : " COMMENT '" + columnMetaInfo.getComment() + "'")
                .append(";\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toDropTableColumnSql(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName()))
                .append(" DROP COLUMN ").append(wrapKeyword(columnMetaInfo.getColumnName()))
                .append(";\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toAlterTableColumnSql(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo, RdbColumnInfo newColumnMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName()))
                .append(" CHANGE COLUMN ").append(wrapKeyword(columnMetaInfo.getColumnName()))
                .append(" ").append(wrapKeyword(newColumnMetaInfo.getColumnName()))
                .append(" ").append(newColumnMetaInfo.getColumnType(this))
                .append(Boolean.TRUE.equals(newColumnMetaInfo.getNotNull()) ? " NOT NULL" : " NULL")
                .append(toColumnDefaultValue(tableMetaInfo.getTableName(), newColumnMetaInfo))
                .append(PluginUtils.isEmpty(newColumnMetaInfo.getComment()) ? " " : " COMMENT '" + newColumnMetaInfo.getComment() + "'")
                .append(";\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toAddTableIndexSql(RdbTableInfo tableMetaInfo, RdbIndexInfo indexMetaInfo) {
        boolean flag = needAddPrefixIndexLength(tableMetaInfo, indexMetaInfo);
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE ").append(Boolean.TRUE.equals(indexMetaInfo.getUnique()) ? "UNIQUE " : "")
                .append("INDEX ").append(wrapKeyword(indexMetaInfo.getIndexName())).append(" ON ")
                .append(wrapKeyword(tableMetaInfo.getTableName()))
                .append("(").append(indexMetaInfo.getColumnNames()
                        .stream()
                        .map(item -> flag ? wrapKeyword(item) + "(" + DEFAULT_PREFIX_INDEX_LENGTH + ")" : wrapKeyword(item))
                        .collect(Collectors.joining(","))
                ).append(")")
                .append(PluginUtils.isEmpty(indexMetaInfo.getComment()) ? "" : " COMMENT '" + dealWithSpecialChar(indexMetaInfo.getComment()) + "'")
                .append(";\n");
        return sqlBuilder.toString();
    }

    /**
     * 处理前缀索引，目前只处理单列
     * @param tableMetaInfo
     * @param indexMetaInfo
     */
    private boolean needAddPrefixIndexLength(RdbTableInfo tableMetaInfo, RdbIndexInfo indexMetaInfo) {
        // 单列索引，并且能确认表的字段信息，不能确定则不需要处理
        if (!PluginUtils.isEmpty(tableMetaInfo.getColumns()) && indexMetaInfo.getColumnNames().size() == 1) {
            Optional<RdbColumnInfo> rdbColumnInfoOptional = tableMetaInfo.getColumns().stream()
                    .filter(item -> item.getColumnName().equals(indexMetaInfo.getColumnNames().get(0))).findFirst();
            if (rdbColumnInfoOptional.isPresent()) {
                RdbColumnInfo rdbColumnInfo = rdbColumnInfoOptional.get();
                String columnType = rdbColumnInfo.getColumnType(this);
                TypeEnum typeEnum = TypeEnum.getTypeEnum(columnType);
                switch (typeEnum) {
                    case VARCHAR:
                    case CHAR:
                        if (columnType.contains("(") && columnType.contains(")")) {
                            return Integer.parseInt(columnType.substring(columnType.indexOf("(") + 1, columnType.indexOf(")"))) > DEFAULT_PREFIX_INDEX_LENGTH;
                        }
                        break;
                    case TEXT:
                    case BLOB:
                        return true;
                    default:
                        break;
                }
            }
        }
        return false;
    }

    @Override
    public String toDropTableIndexSql(RdbTableInfo tableMetaInfo, RdbIndexInfo indexMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("DROP INDEX ");
        sqlBuilder.append(wrapKeyword(indexMetaInfo.getIndexName()))
                .append(" ON ").append(wrapKeyword(tableMetaInfo.getTableName())).append(";\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toRenameTableIndexSql(RdbTableInfo tableMetaInfo, RdbIndexInfo oldIndexMetaInfo, RdbIndexInfo newIndexMetaInfo) {
        StringBuilder sqlBuilder = new StringBuilder("ALTER TABLE ");
        sqlBuilder.append(wrapKeyword(tableMetaInfo.getTableName()))
                .append(" RENAME INDEX ").append(wrapKeyword(oldIndexMetaInfo.getIndexName()))
                .append(" TO ").append(wrapKeyword(newIndexMetaInfo.getIndexName()))
                .append(";\n");
        return sqlBuilder.toString();
    }

    @Override
    public String toSetAutoIncrement(RdbTableInfo tableMetaInfo, RdbColumnInfo columnMetaInfo, long startValue, boolean exists) {
        // 存在性校验
        PluginUtils.precondition(null != tableMetaInfo && null != columnMetaInfo && !PluginUtils.isEmpty(columnMetaInfo.getColumnName()),
                "参数异常，请检查参数是否正确");
        // 校验是否该列已经是自增列，如果是则直接返回空串不执行sql
        List<RdbColumnInfo> columns = Optional.ofNullable(tableMetaInfo.getColumns()).orElse(Collections.emptyList());
        Map<String, RdbColumnInfo> columnNameMap = columns.stream().collect(Collectors.toMap(RdbColumnInfo::getColumnName, Function.identity(), (k1, k2) -> k1));
        if (columnNameMap.containsKey(columnMetaInfo.getColumnName())) {
            RdbColumnInfo sourceColumn = columnNameMap.get(columnMetaInfo.getColumnName());
            if (Boolean.TRUE.equals(sourceColumn.getAutoIncrement())) {
                return "";
            }
        }
        // 生成SQL
        return "ALTER TABLE " + wrapKeyword(tableMetaInfo.getTableName()) + " MODIFY COLUMN " +
                wrapKeyword(columnMetaInfo.getColumnName()) + " bigint(20) AUTO_INCREMENT" + ";\n";
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
        StringBuilder sqlBuilder = new StringBuilder("INSERT INTO ");
        sqlBuilder.append(wrapKeyword(insertData.getTableName()));
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
        StringBuilder sqlBuilder = new StringBuilder("INSERT INTO ");
        sqlBuilder.append(wrapKeyword(insertData.getTableName()));
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

        StringBuilder sqlBuilder = new StringBuilder("UPDATE ");
        sqlBuilder.append(wrapKeyword(updateData.getTableName()));
        sqlBuilder.append(" SET ");
        String hyper = "";
        List<Object> values = new ArrayList<>();
        for (RdbDmlColumnInfo columnInfo : updateData.getColumns()) {
            sqlBuilder.append(hyper).append(wrapKeyword(columnInfo.getColumnName())).append(" = ");
            sqlBuilder.append(wrapValueByType(columnInfo.getColumnType(this), columnInfo.getColumnValue()));
            hyper = ",";
        }

        // 处理条件
        if (null != updateData.getWheres()) {
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
        sqlBuilder.append(wrapKeyword(deleteData.getTableName()));

        // 处理条件
        List<Object> values = new ArrayList<>();
        if (null != deleteData.getWheres()) {
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
        if (!PluginUtils.isEmpty(selectData.getAggregation())) {
            AggregationEnum aggregationEnum = AggregationEnum.getAggregationEnum(selectData.getAggregation());
            sqlBuilder.append(" ) AS ").append(aggregationEnum.getAlias());
        }
        sqlBuilder.append(" FROM ");
        if (!PluginUtils.isEmpty(selectData.getSql())) {
            sqlBuilder.append("(").append(selectData.getSql()).append(")").append(" AS ").append("table_").append(RandomUtils.generateStr(10));
            if (!PluginUtils.isEmpty(selectData.getVariables())) {
                values.addAll(selectData.getVariables());
            }
        } else {
            sqlBuilder.append(wrapKeyword(selectData.getTableName()));
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
    public String handleWhereCondition(DmlWhereCondition wheres, List<Object> placeHolderValues) {
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
                for (Object value : valueList) {
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
     *
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
            case VARCHAR:
            case TEXT:
            case CHAR:
                return wrapValueString(dealWithSpecialChar(valueStr));
            case UNKNOWN:
            case DATE:
            case TIME:
            case DATETIME:
            case TIMESTAMP:
                return wrapValueString(valueStr);
            case TINYINT:
                switch (valueStr) {
                    case "true":
                    case "TRUE":
                        return "1";
                    case "false":
                    case "FALSE":
                        return "0";
                    default:
                        return valueStr;
                }
            case BLOB:
                return wrapBinaryValue(valueStr);
            default:
                return valueStr;
        }
    }

    /**
     * 处理关键字，比如postgresql是双引号，mysql是反引号
     *
     * @return
     */
    @Override
    public String wrapKeyword(String str) {
        return "`" + str + "`";
    }

    /**
     * 处理Order by语句
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
        if (PluginUtils.isEmpty(offset) && PluginUtils.isEmpty(size)) {
            return sql;
        }
        if (sql.contains("LIMIT") || sql.contains("limit") || sql.contains("OFFSET") || sql.contains("offset")) {
            sql = "SELECT * FROM (" + sql + ") AS alias001";
        }
        StringBuilder sqlBuilder = new StringBuilder(sql);
        sqlBuilder.append(" LIMIT ");
        if (!PluginUtils.isEmpty(offset) && PluginUtils.isEmpty(size)) {
            throw new LcapRdbPluginException("mysql offset without limit is not supported");
        } else if (PluginUtils.isEmpty(offset) && !PluginUtils.isEmpty(size)) {
            sqlBuilder.append(size);
        } else {
            sqlBuilder.append(offset).append(", ").append(size);
        }
        return sqlBuilder.toString();
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
        return "0x" + value;
    }

    /**
     * 处理布尔类型，mysql不存在原生的布尔类型，因此需要替换为0/1
     *
     * @param value
     * @return
     */
    @Override
    public String wrapBooleanValue(Boolean value) {
        return Boolean.TRUE.equals(value) ? "1" : "0";
    }

    @Override
    public long tableSize(Connection connection, String schemaName, String tableName) {
        long tableSize = 0;
        try (Statement stmt = connection.createStatement()) {
            String query = "SHOW TABLE STATUS WHERE Name='" + wrapKeyword(tableName) + "'";
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                tableSize = rs.getLong("Data_length") + rs.getLong("Index_length");
            }
            rs.close();
        } catch (SQLException e) {
            throw new LcapRdbPluginException("Get table size error", e);
        }
        return tableSize;
    }


    /**
     * 特殊字符处理，比如mysql的单引号需要转义
     *
     * @param value
     * @return
     */
    @Override
    public String dealWithSpecialChar(String value) {
        if (PluginUtils.isEmpty(value)) {
            return value;
        }
        return value.replace("\\", "\\\\")
                .replace("'", "''")
                .replace("\"", "\\\"");
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

}
