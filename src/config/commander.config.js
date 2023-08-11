import { Command } from "commander";

export default function configureCommander() {
    const command = new Command();

    command
        .option('-e <env>', 'Environment', 'development')

    command.parse();

    const env = process.env.NODE_ENV;
}