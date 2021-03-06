"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Table = require("cli-table2");
const nest_collection_1 = require("../lib/schematics/nest.collection");
const abstract_command_1 = require("./abstract.command");
class GenerateCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('generate <schematic> [name] [path]')
            .alias('g')
            .description(this.buildDescription())
            .option('--dry-run', 'Allow to test changes before command execution')
            .option('--flat', 'Enforce flat structure of generated element')
            .option('--no-spec', 'Disable spec files generation')
            .action((schematic, name, path, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'flat', value: command.flat });
            options.push({
                name: 'spec',
                value: command.spec,
            });
            const inputs = [];
            inputs.push({ name: 'schematic', value: schematic });
            inputs.push({ name: 'name', value: name });
            inputs.push({ name: 'path', value: path });
            yield this.action.handle(inputs, options);
        }));
    }
    buildDescription() {
        return ('Generate a Nest element.\n' +
            '  Available schematics:\n' +
            this.buildSchematicsListAsTable());
    }
    buildSchematicsListAsTable() {
        const leftMargin = '    ';
        const tableConfig = {
            head: ['name', 'alias'],
            chars: {
                // tslint:disable-next-line:quotemark
                "left": leftMargin.concat('│'),
                'top-left': leftMargin.concat('┌'),
                'bottom-left': leftMargin.concat('└'),
                // tslint:disable-next-line:quotemark
                "mid": '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': '',
            },
        };
        const table = new Table(tableConfig);
        for (const schematic of nest_collection_1.NestCollection.getSchematics()) {
            table.push([schematic.name, schematic.alias]);
        }
        return table.toString();
    }
}
exports.GenerateCommand = GenerateCommand;
