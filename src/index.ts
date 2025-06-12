import { rl, askQuestion } from './terminal';
import { gerenciarLinhasMenu } from './modules/gerenciar-linhas';
import { gerenciarPassageirosMenu } from './modules/gerenciar-passageiros';
import { atribuirPassageiroALinha } from './modules/atribuir-passageiro';
import { relatoriosEConsultasMenu } from './modules/relatorios';

export async function exibirMenuPrincipal() {
    console.clear();
    console.log(`
=== SISTEMA DE GESTÃO DE TRANSPORTE ===

Selecione uma opção:

[1] Gerenciar Linhas de Ônibus
[2] Gerenciar Passageiros
[3] Atribuir Passageiro a Linha
[4] Relatórios e Consultas
[5] Simular Viagem (em desenvolvimento)
[0] Encerrar Sistema
    `);

    const opcao = await askQuestion('Digite sua opção: ');

    switch (Number(opcao)) {
        case 1:
            await gerenciarLinhasMenu();
            break;
        case 2:
            await gerenciarPassageirosMenu();
            break;
        case 3:
            await atribuirPassageiroALinha();
            break;
        case 4:
            await relatoriosEConsultasMenu();
            break;
        case 5:
            console.log('\nFuncionalidade em desenvolvimento.');
            await askQuestion('Pressione Enter para continuar...');
            await exibirMenuPrincipal();
            break;
        case 0:
            console.log('\nEncerrando o sistema. Até mais!');
            rl.close();
            break;
        default:
            console.log('\nOpção inválida.');
            await askQuestion('Pressione Enter para continuar...');
            await exibirMenuPrincipal();
            break;
    }
}

exibirMenuPrincipal();