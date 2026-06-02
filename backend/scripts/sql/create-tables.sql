CREATE DATABASE IF NOT EXISTS yuetu_api;

USE yuetu_api;

CREATE TABLE IF NOT EXISTS `interface_info`
(
    `id`         BIGINT AUTO_INCREMENT COMMENT 'ID' PRIMARY KEY,
    `name`       VARCHAR(256) NOT NULL COMMENT '接口名称',
    `desc`       VARCHAR(256) NULL COMMENT '接口描述',
    `url`        VARCHAR(512) NOT NULL COMMENT '接口地址',
    `req_params` TEXT         NOT NULL COMMENT '请求参数',
    `req_header` TEXT         NULL COMMENT '请求头',
    `rep_header` TEXT         NULL COMMENT '响应头',
    `status`     INT          NOT NULL DEFAULT 0 COMMENT '接口状态（0-closed，1-open）',
    `method`     VARCHAR(256) NOT NULL COMMENT '请求类型',
    `user_id`    BIGINT       NOT NULL COMMENT '创建人',
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '软删除（GORM-ORM）'
) COMMENT '接口信息表';

# 用户基础表
CREATE TABLE IF NOT EXISTS `sys_user`
(
    `id`           BIGINT AUTO_INCREMENT COMMENT 'ID' PRIMARY KEY,
    `user_name`    VARCHAR(256) NOT NULL COMMENT '用户名称',
    `user_account` VARCHAR(64)           DEFAULT NULL COMMENT '账号(可选，本地登录用)',
    `avatar_url`   VARCHAR(512) NULL COMMENT '用户头像',
    `email`        VARCHAR(256) NOT NULL COMMENT '用户邮箱',
    `access_key`   VARCHAR(512) NOT NULL COMMENT 'API调用凭证AK',
    `secret_key`   VARCHAR(512) NOT NULL COMMENT 'API调用凭证SK',
    `status`       INT          NOT NULL DEFAULT 0 COMMENT '用户状态：0-正常，1-封禁',
    `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at`   DATETIME     NULL     DEFAULT NULL COMMENT '软删除（GORM-ORM）',
    UNIQUE KEY `uk_ak` (`access_key`), -- 重要：AK 必须唯一且加索引
    INDEX `idx_account` (`user_account`)
) COMMENT '用户表';

-- 角色表
CREATE TABLE IF NOT EXISTS `sys_role`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '角色ID' PRIMARY KEY,
    `role_name`  VARCHAR(64) NOT NULL COMMENT '角色名称(如：管理员)',
    `role_key`   VARCHAR(64) NOT NULL COMMENT '角色权限标识(如：admin)',
    `created_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_role_key` (`role_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='角色表';

-- 用户-角色关联表
CREATE TABLE IF NOT EXISTS `sys_user_role`
(
    `id`      BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `role_id` BIGINT NOT NULL COMMENT '角色ID',
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_role_id` (`role_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户角色关联表';

# 第三方授权表 (OAuth专用)
CREATE TABLE IF NOT EXISTS `sys_user_auth`
(
    `id`            BIGINT AUTO_INCREMENT COMMENT 'ID' PRIMARY KEY,
    `user_id`       BIGINT       NOT NULL COMMENT '关联sys_user的ID',
    `identity_type` VARCHAR(32)  NOT NULL COMMENT '类型: github, google, password',
    `identifier`    VARCHAR(128) NOT NULL COMMENT '唯一标识: openid, 账号名等',
    `credential`    VARCHAR(256) DEFAULT NULL COMMENT '凭证: 密码hash或token',
    UNIQUE KEY `uk_identity` (`identity_type`, `identifier`), -- 防止重复绑定
    INDEX `idx_user_id` (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户授权关联表';

INSERT IGNORE INTO `sys_role` (`id`, `role_name`, `role_key`)
VALUES (1, '管理员', 'admin');
INSERT IGNORE INTO `sys_role` (`id`, `role_name`, `role_key`)
VALUES (2, '普通用户', 'user');