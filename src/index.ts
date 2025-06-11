import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface LinhaOnibus {
    numero: string;
    trajeto: string;
    passageiros: Passageiro[];
}
const linhas: LinhaOnibus[] = [];

interface Passageiro {
    nome: string;
    documento: string;
}
const passageiros: Passageiro[] = [];

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function exibirMenuPrincipal() {
    console.log(`
=== SISTEMA DE GESTÃO DE TRANSPORTE ===

Selecione uma opção:

[1] Gerenciar Linhas de Ônibus
[2] Gerenciar Passageiros
[3] Atribuir Passageiro a Linha
[4] Relatórios e Consultas
[5] Simular Viagem
[0] Encerrar Sistema
    `);

    let opcao = Number(await askQuestion('Digite sua opção: '));

    switch (opcao) {
        case 1:
            await gerenciarLinhasDeOnibusMenu();
            break;
        case 2:
            await gerenciarPassageirosMenu();
            break;
        case 3:
            await atribuirPassageiroALinha();
            await exibirMenuPrincipal();
            break;
        case 4:
            await relatoriosEConsultasMenu();
            break;
        case 5:
            console.log('Você selecionou: Simular Viagem');
            await exibirMenuPrincipal();
            break;
        case 0:
            console.log('Encerrando o sistema. Até mais!');
            rl.close();
            break;
        default:
            console.log('Opção inválida. Por favor, selecione uma opção válida.');
            await exibirMenuPrincipal();
            break;
    }
}

async function gerenciarLinhasDeOnibusMenu() {
    console.log(`
=== GESTÃO DE LINHAS ===

[1] Cadastrar nova linha
[2] Listar todas as linhas
[3] Remover linha existente
[0] Voltar ao menu principal
    `);

    let opcao = Number(await askQuestion('Digite sua opção: '));

    switch (opcao) {
        case 1:
            await cadastrarLinha();
            break;
        case 2:
            await listarTodasAsLinhas();
            break;
        case 3:
            console.log('Funcionalidade: Remover linha existente (em desenvolvimento)');
            await gerenciarLinhasDeOnibusMenu();
            break;
        case 0:
            await exibirMenuPrincipal();
            break;
        default:
            console.log('Opção inválida. Por favor, selecione uma opção válida.');
            await gerenciarLinhasDeOnibusMenu();
            break;
    }
}

async function cadastrarLinha() {
    console.log('\n--- Cadastrar Nova Linha ---');
    const numero = await askQuestion('Digite o número da linha: ');
    const trajeto = await askQuestion('Digite o trajeto da linha (ex: Centro - Bairro X): ');

    const novaLinha: LinhaOnibus = { numero, trajeto, passageiros: [] };
    linhas.push(novaLinha);
    console.log(`Linha "${numero} - ${trajeto}" cadastrada com sucesso!`);
    await gerenciarLinhasDeOnibusMenu();
}

async function listarTodasAsLinhas() {
    console.log('\n--- Todas as Linhas Cadastradas ---');
    if (linhas.length === 0) {
        console.log('Nenhuma linha cadastrada ainda.');
    } else {
        linhas.forEach((linha, index) => {
            console.log(`${index + 1}. Número: ${linha.numero}, Trajeto: ${linha.trajeto} (${linha.passageiros.length} passageiro(s))`);
        });
    }
    await gerenciarLinhasDeOnibusMenu();
}

async function gerenciarPassageirosMenu() {
    console.log(`
=== GESTÃO DE PASSAGEIROS ===

[1] Cadastrar novo passageiro
[2] Listar todos os passageiros
[3] Remover passageiro
[0] Voltar ao menu principal
    `);

    let opcao = Number(await askQuestion('Digite sua opção: '));

    switch (opcao) {
        case 1:
            await cadastrarPassageiro();
            break;
        case 2:
            await listarTodosOsPassageiros();
            break;
        case 3:
            console.log('Funcionalidade: Remover passageiro (em desenvolvimento)');
            await gerenciarPassageirosMenu();
            break;
        case 0:
            await exibirMenuPrincipal();
            break;
        default:
            console.log('Opção inválida. Por favor, selecione uma opção válida.');
            await gerenciarPassageirosMenu();
            break;
    }
}

async function cadastrarPassageiro() {
    console.log('\n--- Cadastrar Novo Passageiro ---');
    const nome = await askQuestion('Digite o nome do passageiro: ');
    const documento = await askQuestion('Digite o documento do passageiro (RG/CPF): ');

    const novoPassageiro: Passageiro = { nome, documento };
    passageiros.push(novoPassageiro);
    console.log(`Passageiro "${nome}" cadastrado com sucesso!`);
    await gerenciarPassageirosMenu();
}

async function listarTodosOsPassageiros() {
    console.log('\n--- Todos os Passageiros Cadastrados ---');
    if (passageiros.length === 0) {
        console.log('Nenhuma passageiro cadastrado ainda.');
    } else {
        passageiros.forEach((passageiro, index) => {
            console.log(`${index + 1}. Nome: ${passageiro.nome}, Documento: ${passageiro.documento}`);
        });
    }
    await gerenciarPassageirosMenu();
}

async function atribuirPassageiroALinha() {
    console.log('\n--- Atribuir Passageiro a Linha ---');

    if (linhas.length === 0) {
        console.log('Não há linhas cadastradas. Cadastre uma linha primeiro.');
        await exibirMenuPrincipal();
        return;
    }

    if (passageiros.length === 0) {
        console.log('Não há passageiros cadastrados. Cadastre um passageiro primeiro.');
        await exibirMenuPrincipal();
        return;
    }

    console.log('\nLinhas disponíveis:');
    linhas.forEach((linha, index) => {
        console.log(`${index + 1}. Número: ${linha.numero}, Trajeto: ${linha.trajeto}`);
    });

    let linhaIndex = Number(await askQuestion('Digite o número da linha para atribuir o passageiro: ')) - 1;

    if (linhaIndex < 0 || linhaIndex >= linhas.length || isNaN(linhaIndex)) {
        console.log('Seleção de linha inválida.');
        await exibirMenuPrincipal();
        return;
    }

    console.log('\nPassageiros disponíveis:');
    passageiros.forEach((passageiro, index) => {
        console.log(`${index + 1}. Nome: ${passageiro.nome}, Documento: ${passageiro.documento}`);
    });

    let passageiroIndex = Number(await askQuestion('Digite o número do passageiro para atribuir à linha: ')) - 1;

    if (passageiroIndex < 0 || passageiroIndex >= passageiros.length || isNaN(passageiroIndex)) {
        console.log('Seleção de passageiro inválida.');
        await exibirMenuPrincipal();
        return;
    }

    const linhaSelecionada = linhas[linhaIndex];
    const passageiroSelecionado = passageiros[passageiroIndex];

    if (linhaSelecionada.passageiros.some(p => p.documento === passageiroSelecionado.documento)) {
        console.log(`O passageiro "${passageiroSelecionado.nome}" já está atribuído à linha "${linhaSelecionada.numero}".`);
    } else {
        linhaSelecionada.passageiros.push(passageiroSelecionado);
        console.log(`Passageiro "${passageiroSelecionado.nome}" atribuído à linha "${linhaSelecionada.numero}" com sucesso!`);
    }

    await exibirMenuPrincipal();
}

async function relatoriosEConsultasMenu() {
    console.log(`
=== RELATÓRIOS E CONSULTAS ===

[1] Ver passageiros por linha
[2] Ver linhas com passageiros
[3] Consultar linhas ativas
[0] Voltar ao menu principal
    `);

    let opcao = Number(await askQuestion('Digite sua opção: '));

    switch (opcao) {
        case 1:
            console.log('Funcionalidade: Ver passageiros por linha (em desenvolvimento)');
            await relatoriosEConsultasMenu();
            break;
        case 2:
            console.log('Funcionalidade: Ver linhas com passageiros (em desenvolvimento)');
            await relatoriosEConsultasMenu();
            break;
        case 3:
            console.log('Funcionalidade: Consultar linhas ativas (em desenvolvimento)');
            await relatoriosEConsultasMenu();
            break;
        case 0:
            await exibirMenuPrincipal();
            break;
        default:
            console.log('Opção inválida. Por favor, selecione uma opção válida.');
            await relatoriosEConsultasMenu();
            break;
    }
}

exibirMenuPrincipal();
