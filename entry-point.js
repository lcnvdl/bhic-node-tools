const fs = require("fs");
const path = require("path");
const scripts = path.join(__dirname, "scripts");

module.exports = ({ CommandBase, commands }) => {
  const CommandPipe = commands.pipe;

  class NodeToolsCommand extends CommandBase {
    async run(args) {
      if (args[0] === "increase-version") {
        return await this._increaseVersion();
      }
      else if (args[0] === "increase-and-publish") {
        let code = await this._increaseVersion();

        if (code === this.codes.success) {
          code = await this._publishVersion();
        }

        return code;
      }
      else if (args[0] === "new") {
        return await this._newProject(args.slice(1));
      }

      return this.codes.invalidArguments;
    }

    async _newProject(args) {
      if (args[0] === "ts" || args[0] === "typescript") {
        if (!fs.existsSync("package.json")) {
          const pipeInit = new CommandPipe(this.environment.fork());
          await pipeInit.loadFromFile(path.join(scripts, "init-node.cmd"));
        }

        const env = this.environment.fork();
        if (!args[1] || args[1] === "lib") {
          env.setVariable("type", "lib");
        }
        else {
          return this.codes.invalidArguments;
        }

        env.setVariable("dataDirectory", path.join(__dirname, "data"));
        const pipe = new CommandPipe(env);
        await pipe.loadFromFile(path.join(scripts, "start-typescript-project.cmd"));
      }
      else {
        return this.codes.invalidArguments;
      }

      return this.codes.success;
    }

    async _publishVersion() {
      const pipe = new CommandPipe(this.environment.fork());
      await pipe.loadFromFile(path.join(scripts, "publish-version.cmd"));
      return this.codes.success;
    }

    async _increaseVersion() {
      const pipe = new CommandPipe(this.environment.fork());
      await pipe.loadFromFile(path.join(scripts, "increase-version.cmd"));
      return this.codes.success;
    }
  }

  return NodeToolsCommand;
};
