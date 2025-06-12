import { askQuestion } from "../terminal";
import { exibirMenuPrincipal } from "../index";

export async function relatoriosEConsultasMenu() {
    console.clear();
    console.log(`
=== RELATÓRIOS E CONSULTAS ===

[1] Ver passageiros por linha (em desenvolvimento)
[0] Voltar ao menu principal
    `);

    const opcao = await askQuestion('Digite sua opção: ');

     switch (Number(opcao)) {
        case 0:
            await exibirMenuPrincipal();
            break;
        default:
            console.log('Opção inválida ou em desenvolvimento.');
            await askQuestion('Pressione Enter para continuar...');
            await relatoriosEConsultasMenu();
            break;
    }
}