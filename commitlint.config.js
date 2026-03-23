export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // type 必须是以下之一
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // Bug 修复
        'docs', // 文档变更
        'style', // 代码格式（不影响逻辑）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建/工具变更
        'revert', // 回滚
        'ci', // CI/CD 配置变更
        'build', // 构建系统变更
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 120],
  },
}
