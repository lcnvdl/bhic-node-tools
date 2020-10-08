module.exports = ({ CommandBase, commands }) => {
    const path = require("path");
    const scripts = path.join(__dirname, "scripts");

    class NodeToolsCommand extends CommandBase {
        async run(args) {
            if (args[0] === "increase-version") {
                return await increaseVersion();
            }
            else if (args[0] === "increase-and-publish") {
                let code = await increaseVersion();

                if (code === this.codes.success) {
                    code = await publishVersion();
                }

                return code;
            }

            return this.codes.invalidArguments;
        }
    }

    async function publishVersion() {
        const pipe = new (commands.pipe)(this.environment.fork());
        await pipe.loadFromFile(path.join(scripts, "publish-version.cmd"));
        return this.codes.success;
    }

    async function increaseVersion() {
        const pipe = new (commands.pipe)(this.environment.fork());
        await pipe.loadFromFile(path.join(scripts, "increase-version.cmd"));
        return this.codes.success;
    }

    return NodeToolsCommand;
};
