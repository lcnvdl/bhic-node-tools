module.exports = ({ CommandBase, commands }) => {
    class NodeToolsCommand extends CommandBase {
        async run(args) {
            const path = require("path");
            const scripts = path.join(__dirname, "scripts");

            if (args[0] == "--increase-version") {
                const pipe = new (commands.pipe)(this.environment.fork());
                await pipe.loadFromFile(path.join(scripts, "increase-version.cmd"));
                return this.codes.success;
            }

            return this.codes.invalidArguments;
        }
    }

    return NodeToolsCommand;
};
