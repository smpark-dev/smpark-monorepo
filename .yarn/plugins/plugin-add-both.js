const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'plugin-add-both',
  factory: (require) => {
    const { BaseCommand } = require('@yarnpkg/cli');
    const { Option } = require('clipanion');

    class AddBothCommand extends BaseCommand {
      static paths = [['add-both']];

      subproject = Option.String();
      packages = Option.Rest();
      dev = Option.Boolean('-D,--dev', false, {
        description: '패키지를 개발 의존성으로 추가',
      });

      async execute() {
        if (!this.subproject || this.packages.length === 0) {
          throw new Error('사용법: yarn add-both <서브프로젝트> <패키지...>');
        }

        const rootDir = this.context.cwd;
        const subprojectDir = path.join(rootDir, 'apps', this.subproject);

        if (!fs.existsSync(subprojectDir)) {
          throw new Error(`서브프로젝트 "${this.subproject}"를 찾을 수 없습니다`);
        }

        const addPackages = async (dir, packages, dev) => {
          const args = ['add', ...packages];
          if (dev) args.push('--dev');
          
          const originalCwd = process.cwd();
          process.chdir(dir);

          try {
            const result = await this.cli.run(args);
            if (result !== 0) {
              throw new Error(`패키지 추가 중 오류 발생: yarn ${args.join(' ')}`);
            }
          } finally {
            process.chdir(originalCwd);
          }
        };

        // 서브프로젝트에 패키지 추가
        await addPackages(subprojectDir, this.packages, this.dev);

        // 루트 프로젝트에 패키지 추가
        await addPackages(rootDir, this.packages, this.dev);

        return 0;
      }
    }

    return {
      commands: [AddBothCommand],
    };
  },
};