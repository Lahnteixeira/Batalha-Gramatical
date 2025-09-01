// Variáveis globais
let players = [];
let currentPlayerIndex = 0;
let gameStarted = false;
let selectedAvatar = 'blue';
let currentLevel = 1;
let currentQuestionIndex = 0;
let questionsAnswered = 0;
let totalQuestions = 15;
let gameStartTime = null;
let timerInterval = null;
let timeLeft = 30;
let questionStartTime = null;

// Base de dados das perguntas expandida com 6 níveis progressivos
const questionDatabase = {
    1: [ // NÍVEL 1 - GRAMÁTICA BÁSICA (30s por pergunta)
        {
            question: "Qual é o sujeito da frase: 'João foi à escola'?",
            options: ["João", "foi", "à", "escola"],
            correct: 0,
            explanation: "João é quem pratica a ação de ir à escola."
        },
        {
            question: "Que tipo de palavra é 'casa'?",
            options: ["Verbo", "Adjetivo", "Substantivo", "Artigo"],
            correct: 2,
            explanation: "Casa é um substantivo comum que nomeia um lugar."
        },
        {
            question: "Qual artigo definido feminino singular?",
            options: ["o", "a", "um", "uma"],
            correct: 1,
            explanation: "O artigo 'a' é definido, feminino e singular."
        },
        {
            question: "Complete: '__ menino brinca no parque'",
            options: ["A", "O", "Um", "Uma"],
            correct: 1,
            explanation: "Menino é masculino, então usa o artigo 'O'."
        },
        {
            question: "Qual palavra indica ação?",
            options: ["Mesa", "Correr", "Bonito", "Rapidamente"],
            correct: 1,
            explanation: "Correr é um verbo que indica a ação de correr."
        },
        {
            question: "Quantas sílabas tem a palavra 'computador'?",
            options: ["3", "4", "5", "6"],
            correct: 2,
            explanation: "Com-pu-ta-dor tem 4 sílabas."
        },
        {
            question: "Qual é o plural de 'animal'?",
            options: ["animais", "animals", "animales", "animaes"],
            correct: 0,
            explanation: "O plural correto é 'animais'."
        },
        {
            question: "O que é um adjetivo?",
            options: ["Palavra que indica ação", "Palavra que nomeia", "Palavra que qualifica", "Palavra que liga"],
            correct: 2,
            explanation: "Adjetivo é a palavra que qualifica ou caracteriza o substantivo."
        },
        {
            question: "Complete: 'As meninas __ brincando'",
            options: ["está", "estão", "estar", "estamos"],
            correct: 1,
            explanation: "'As meninas' é plural, então o verbo fica 'estão'."
        },
        {
            question: "Qual palavra é um pronome?",
            options: ["Casa", "Bonito", "Correr", "Ela"],
            correct: 3,
            explanation: "'Ela' é um pronome pessoal do caso reto."
        },
        {
            question: "O que significa a palavra 'biblioteca'?",
            options: ["Lugar para comer", "Lugar com livros", "Lugar para dormir", "Lugar para brincar"],
            correct: 1,
            explanation: "Biblioteca é o local onde ficam guardados os livros."
        },
        {
            question: "Qual é o feminino de 'gato'?",
            options: ["gata", "gatinha", "gatona", "gateira"],
            correct: 0,
            explanation: "O feminino simples de 'gato' é 'gata'."
        },
        {
            question: "Complete: 'Eu __ na escola ontem'",
            options: ["vou", "fui", "irei", "vá"],
            correct: 1,
            explanation: "'Ontem' indica passado, então usamos 'fui'."
        },
        {
            question: "Quantas vogais tem o alfabeto português?",
            options: ["4", "5", "6", "7"],
            correct: 2,
            explanation: "São 5 vogais: A, E, I, O, U."
        },
        {
            question: "O que é uma frase?",
            options: ["Uma palavra", "Um conjunto de palavras com sentido", "Uma letra", "Um som"],
            correct: 1,
            explanation: "Frase é um conjunto de palavras que expressa uma ideia completa."
        }
    ],
    2: [ // NÍVEL 2 - CLASSES GRAMATICAIS (25s por pergunta)
        {
            question: "Identifique o substantivo próprio:",
            options: ["cidade", "Brasil", "pessoa", "animal"],
            correct: 1,
            explanation: "Brasil é um substantivo próprio pois nomeia um país específico."
        },
        {
            question: "Qual é o grau superlativo de 'bom'?",
            options: ["melhor", "ótimo", "muito bom", "boníssimo"],
            correct: 1,
            explanation: "Ótimo é o grau superlativo absoluto sintético de 'bom'."
        },
        {
            question: "Em 'Rapidamente ele correu', a palavra 'rapidamente' é:",
            options: ["Adjetivo", "Advérbio", "Substantivo", "Verbo"],
            correct: 1,
            explanation: "Rapidamente é um advérbio de modo, modifica o verbo 'correu'."
        },
        {
            question: "Qual frase tem um pronome possessivo?",
            options: ["Ele chegou cedo", "Meu livro está aqui", "João é alto", "Corro muito"],
            correct: 1,
            explanation: "'Meu' é um pronome possessivo, indica posse."
        },
        {
            question: "O que liga duas orações?",
            options: ["Substantivo", "Adjetivo", "Conjunção", "Advérbio"],
            correct: 2,
            explanation: "Conjunção é a palavra que liga orações ou termos similares."
        },
        {
            question: "Identifique o verbo na frase: 'O gato subiu no telhado'",
            options: ["gato", "subiu", "telhado", "no"],
            correct: 1,
            explanation: "'Subiu' é o verbo que indica a ação praticada pelo gato."
        },
        {
            question: "Qual é o aumentativo de 'casa'?",
            options: ["casinha", "casarão", "casita", "casona"],
            correct: 1,
            explanation: "Casarão é o aumentativo de casa."
        },
        {
            question: "Em que pessoa está o verbo 'cantamos'?",
            options: ["1ª pessoa do singular", "2ª pessoa do plural", "1ª pessoa do plural", "3ª pessoa do plural"],
            correct: 2,
            explanation: "'Cantamos' está na 1ª pessoa do plural (nós cantamos)."
        },
        {
            question: "Qual palavra é uma preposição?",
            options: ["muito", "sobre", "bonito", "correr"],
            correct: 1,
            explanation: "'Sobre' é uma preposição que estabelece relação entre palavras."
        },
        {
            question: "O que é um artigo indefinido?",
            options: ["o, a, os, as", "um, uma, uns, umas", "este, esta", "meu, minha"],
            correct: 1,
            explanation: "Os artigos indefinidos são: um, uma, uns, umas."
        },
        {
            question: "Qual frase tem sujeito oculto?",
            options: ["João correu", "Chegamos cedo", "O livro caiu", "Maria cantou"],
            correct: 1,
            explanation: "Em 'Chegamos cedo', o sujeito 'nós' está oculto."
        },
        {
            question: "Identifique o objeto direto: 'Maria comprou flores'",
            options: ["Maria", "comprou", "flores", "não há"],
            correct: 2,
            explanation: "'Flores' é o objeto direto, complementa o verbo sem preposição."
        },
        {
            question: "Qual é o coletivo de 'abelha'?",
            options: ["enxame", "cardume", "rebanho", "matilha"],
            correct: 0,
            explanation: "Enxame é o coletivo de abelhas."
        },
        {
            question: "Em que tempo está 'cantarei'?",
            options: ["Presente", "Pretérito", "Futuro", "Condicional"],
            correct: 2,
            explanation: "'Cantarei' está no futuro do presente."
        },
        {
            question: "Qual é o diminutivo de 'pé'?",
            options: ["pezinho", "pezito", "pequeno pé", "pé pequeno"],
            correct: 0,
            explanation: "Pezinho é o diminutivo de pé."
        }
    ],
    3: [ // NÍVEL 3 - SINTAXE BÁSICA (20s por pergunta)
        {
            question: "Na frase 'O menino inteligente estuda', qual é o núcleo do sujeito?",
            options: ["O", "menino", "inteligente", "estuda"],
            correct: 1,
            explanation: "'Menino' é o núcleo do sujeito, a palavra principal."
        },
        {
            question: "Identifique o predicado: 'As crianças brincaram no parque'",
            options: ["As crianças", "brincaram", "brincaram no parque", "no parque"],
            correct: 2,
            explanation: "O predicado é 'brincaram no parque', tudo que se diz sobre o sujeito."
        },
        {
            question: "Qual frase tem predicado nominal?",
            options: ["João correu rápido", "Maria é professora", "Eles chegaram cedo", "Nós estudamos muito"],
            correct: 1,
            explanation: "'Maria é professora' tem predicado nominal com verbo de ligação."
        },
        {
            question: "O que é aposto?",
            options: ["Termo que completa o verbo", "Termo que explica outro termo", "Tipo de sujeito", "Tipo de predicado"],
            correct: 1,
            explanation: "Aposto é um termo que explica, especifica ou resume outro termo."
        },
        {
            question: "Em 'Deu o livro ao menino', qual é o objeto indireto?",
            options: ["livro", "ao menino", "deu", "não há"],
            correct: 1,
            explanation: "'Ao menino' é objeto indireto, complementa o verbo com preposição."
        },
        {
            question: "Qual é o tipo de sujeito em 'Choveu ontem'?",
            options: ["Simples", "Composto", "Oculto", "Inexistente"],
            correct: 3,
            explanation: "Verbos que indican fenômenos da natureza têm sujeito inexistente."
        },
        {
            question: "Identifique o adjunto adnominal: 'A casa azul é bonita'",
            options: ["casa", "azul", "é", "bonita"],
            correct: 1,
            explanation: "'Azul' é adjunto adnominal, caracteriza o substantivo 'casa'."
        },
        {
            question: "O que é vocativo?",
            options: ["Sujeito da frase", "Chamamento", "Tipo de predicado", "Complemento verbal"],
            correct: 1,
            explanation: "Vocativo é o termo usado para chamar ou interpelar alguém."
        },
        {
            question: "Em 'Preciso de ajuda', o termo 'de ajuda' é:",
            options: ["Objeto direto", "Objeto indireto", "Complemento nominal", "Adjunto adverbial"],
            correct: 1,
            explanation: "'De ajuda' é objeto indireto, complementa o verbo com preposição."
        },
        {
            question: "Qual frase tem sujeito composto?",
            options: ["João e Maria chegaram", "O menino correu", "Eles estudaram", "Nós cantamos"],
            correct: 0,
            explanation: "'João e Maria' formam um sujeito composto (dois núcleos)."
        },
        {
            question: "O que é predicativo do sujeito?",
            options: ["Termo que completa o verbo", "Termo que qualifica o sujeito", "Tipo de sujeito", "Complemento nominal"],
            correct: 1,
            explanation: "Predicativo do sujeito qualifica o sujeito através de verbo de ligação."
        },
        {
            question: "Em 'Chegou cansado', 'cansado' é:",
            options: ["Objeto direto", "Predicativo do sujeito", "Adjunto adnominal", "Complemento nominal"],
            correct: 1,
            explanation: "'Cansado' é predicativo do sujeito, indica estado do sujeito."
        },
        {
            question: "Identifique o adjunto adverbial: 'Estudei muito ontem'",
            options: ["estudei", "muito", "ontem", "muito e ontem"],
            correct: 3,
            explanation: "'Muito' (intensidade) e 'ontem' (tempo) são adjuntos adverbiais."
        },
        {
            question: "O que caracteriza uma oração?",
            options: ["Ter sujeito apenas", "Ter predicado apenas", "Ter verbo", "Ter complemento"],
            correct: 2,
            explanation: "Oração é caracterizada pela presença de um verbo."
        },
        {
            question: "Em 'A esperança de dias melhores', o termo 'de dias melhores' é:",
            options: ["Adjunto adnominal", "Complemento nominal", "Objeto indireto", "Aposto"],
            correct: 1,
            explanation: "'De dias melhores' é complemento nominal, completa o sentido de 'esperança'."
        }
    ],
    4: [ // NÍVEL 4 - GÊNEROS TEXTUAIS (18s por pergunta)
        {
            question: "Qual característica NÃO pertence ao gênero NOTÍCIA?",
            options: ["Linguagem objetiva", "Presença de lead", "Opinião pessoal do autor", "Informações atuais"],
            correct: 2,
            explanation: "Notícias devem ser imparciais, sans opinião pessoal do jornalista."
        },
        {
            question: "O que é o 'lead' em uma notícia?",
            options: ["O título", "O primeiro parágrafo com informações principais", "A conclusão", "A opinião do autor"],
            correct: 1,
            explanation: "Lead é o primeiro parágrafo que responde: o quê, quem, quando, onde, como, por quê."
        },
        {
            question: "Qual é a principal função de um EDITORIAL?",
            options: ["Informar fatos", "Expressar opinião do jornal", "Entreter o leitor", "Ensinar algo"],
            correct: 1,
            explanation: "Editorial expressa a opinião oficial do veículo de comunicação."
        },
        {
            question: "Em uma CARTA PESSOAL, é obrigatório ter:",
            options: ["Linguagem formal", "Data e local", "Assinatura do cartório", "Bibliografia"],
            correct: 1,
            explanation: "Cartas pessoais devem conter data, local, vocativo, corpo e despedida."
        },
        {
            question: "O que caracteriza um TEXTO INSTRUCIONAL?",
            options: ["Narra uma história", "Ensina como fazer algo", "Expressa sentimentos", "Descreve paisagens"],
            correct: 1,
            explanation: "Textos instrucionais ensinam procedimentos através de comandos sequenciais."
        },
        {
            question: "Qual elemento é essencial em uma BIOGRAFIA?",
            options: ["Rimas", "Cronologia da vida da pessoa", "Diálogos fictícios", "Moral da história"],
            correct: 1,
            explanation: "Biografia deve apresentar os fatos da vida de uma pessoa em ordem cronológica."
        },
        {
            question: "O que diferencia CRÔNICA de NOTÍCIA?",
            options: ["Crônica é mais objetiva", "Crônica tem caráter reflexivo e pessoal", "Notícia é mais longa", "Não há diferença"],
            correct: 1,
            explanation: "Crônica permite reflexão pessoal e subjetividade, diferente da notícia."
        },
        {
            question: "Em um ANÚNCIO PUBLICITÁRIO, o que é mais importante?",
            options: ["Informar dados científicos", "Persuadir o consumidor", "Contar uma história", "Ensinar gramática"],
            correct: 1,
            explanation: "Anúncios publicitários têm função persuasiva, convencer a comprar/aderir."
        },
        {
            question: "Qual característica define um CONTO?",
            options: ["História longa com muitos personagens", "Narrativa curta com clímax único", "Texto em versos", "Lista de instruções"],
            correct: 1,
            explanation: "Conto é narrativa curta, concentrada em um único conflito."
        },
        {
            question: "O que é uma RESENHA?",
            options: ["Resumo simples", "Análise crítica de uma obra", "História inventada", "Lista de características"],
            correct: 1,
            explanation: "Resenha analisa criticamente uma obra, apresentando opinião fundamentada."
        },
        {
            question: "Em um RELATÓRIO, a linguagem deve ser:",
            options: ["Poética e subjetiva", "Técnica e objetiva", "Informal e descontraída", "Persuasiva e emocional"],
            correct: 1,
            explanation: "Relatórios exigem linguagem técnica, clara e objetiva."
        },
        {
            question: "O que caracteriza um TEXTO DISSERTATIVO?",
            options: ["Narra fatos", "Defende um ponto de vista", "Descreve objetos", "Ensina procedimentos"],
            correct: 1,
            explanation: "Texto dissertativo apresenta e defende uma tese com argumentos."
        },
        {
            question: "Qual é a estrutura básica de uma FÁBULA?",
            options: ["Introdução, desenvolvimento, conclusão", "Situação inicial, conflito, moral", "Tese, argumentos, conclusão", "Personagens, tempo, espaço"],
            correct: 1,
            explanation: "Fábula apresenta situação, conflito e termina com uma moral."
        },
        {
            question: "O que é um TEXTO EXPOSITIVO?",
            options: ["Texto que narra aventuras", "Texto que explica ou informa", "Texto que convence", "Texto que emociona"],
            correct: 1,
            explanation: "Texto expositivo tem função de explica, informar ou esclarecer."
        },
        {
            question: "Em uma ENTREVISTA, quem faz as perguntas?",
            options: ["O entrevistado", "O entrevistador", "O leitor", "O editor"],
            correct: 1,
            explanation: "O entrevistador é quem conduz a entrevista fazendo perguntas."
        }
    ],
    5: [ // NÍVEL 5 - LITERATURA E INTERPRETAÇÃO (15s por pergunta)
        {
            question: "Em 'O vento sussurrava segredos', que figura de linguagem foi usada?",
            options: ["Metáfora", "Personificação", "Comparação", "Ironia"],
            correct: 1,
            explanation: "Personificação atribui características humanas (sussurrar) ao vento."
        },
        {
            question: "Qual é o tema principal do poema que fala sobre saudade da infância?",
            options: ["Amor", "Nostalgia", "Natureza", "Morte"],
            correct: 1,
            explanation: "Nostalgia é o sentimento de saudade de tempos passados."
        },
        {
            question: "O que significa 'nas entrelinhas' de um texto?",
            options: ["Entre as linhas escritas", "O que está implícito", "As linhas numeradas", "O espaçamento do texto"],
            correct: 1,
            explanation: "'Nas entrelinhas' refere-se ao sentido implícito, não explícito."
        },
        {
            question: "Em 'Seus olhos eram duas estrelas', temos uma:",
            options: ["Personificação", "Metáfora", "Metonímia", "Onomatopeia"],
            correct: 1,
            explanation: "Metáfora compara olhos com estrelas sem usar conectivo comparativo."
        },
        {
            question: "Qual é a função do narrador em 1ª pessoa?",
            options: ["Contar como observador", "Contar participando da história", "Não participar da narrativa", "Ser apenas personagem"],
            correct: 1,
            explanation: "Narrador em 1ª pessoa participa da história como personagem."
        },
        {
            question: "O que caracteriza um texto LÍRICO?",
            options: ["Presença de diálogos", "Expressão de sentimentos", "Sequência de ações", "Descrição de lugares"],
            correct: 1,
            explanation: "Texto lírico expressa sentimentos and emoções do eu-lírico."
        },
        {
            question: "Em uma narrativa, o que é o CLÍMAX?",
            options: ["O início da história", "O momento de maior tensão", "O final da história", "A apresentação dos personagens"],
            correct: 1,
            explanation: "Clímax é o ponto de maior tensão ou conflito na narrativa."
        },
        {
            question: "O que é uma RIMA?",
            options: ["Repetição de sons no final dos versos", "Número de sílabas do verso", "Tema do poema", "Tipo de estrofe"],
            correct: 0,
            explanation: "Rima é a repetição de sons semelhantes no final dos versos."
        },
        {
            question: "Qual é a diferença entre AUTOR e NARRADOR?",
            options: ["Não há diferença", "Autor escreve, narrador conta a história", "Autor conta, narrador escreve", "São sempre a mesma pessoa"],
            correct: 1,
            explanation: "Autor é quem escreve o texto; narrador é quem conta a história dentro do texto."
        },
        {
            question: "O que é INTERTEXTUALIDADE?",
            options: ["Texto muito longo", "Diálogo entre textos", "Texto sem sentido", "Texto científico"],
            correct: 1,
            explanation: "Intertextualidade é o diálogo entre textos, referências a outras obras."
        },
        {
            question: "Em 'Era uma vez...', que tipo de discurso é usado?",
            options: ["Discurso direto", "Discurso indireto", "Discurso indireto livre", "Discurso do narrador"],
            correct: 3,
            explanation: "'Era uma vez' é típico do discurso do narrador iniciando um conto."
        },
        {
            question: "O que é POLISSEMIA?",
            options: ["Palavra com um só sentido", "Palavra com vários sentidos", "Palavra inventada", "Palavra estrangeira"],
            correct: 1,
            explanation: "Polissemia é quando uma palavra tem múltiplos significados."
        },
        {
            question: "Qual elemento NÃO pertence à estrutura narrativa?",
            options: ["Enredo", "Personagens", "Rima", "Tempo"],
            correct: 2,
            explanation: "Rima pertence à estrutura poética, não narrativa."
        },
        {
            question: "O que é AMBIGUIDADE em um texto?",
            options: ["Texto claro", "Duplo sentido", "Texto longo", "Texto científico"],
            correct: 1,
            explanation: "Ambiguidade ocorre quando uma frase pode ter mais de uma interpretação."
        },
        {
            question: "Em poesia, o que é uma ESTROFE?",
            options: ["Uma palavra", "Um verso", "Conjunto de versos", "O título"],
            correct: 2,
            explanation: "Estrofe é um conjunto de versos que formam uma unidade."
        }
    ],
    6: [ // NÍVEL 6 - DESAFIO AVANÇADO (12s por pergunta)
        {
            question: "Identifique a figura de linguagem: 'A vida é um palco onde todos representamos'",
            options: ["Hipérbole", "Metáfora", "Eufemismo", "Pleonasmo"],
            correct: 1,
            explanation: "Metáfora compara vida com palco, criando nova significação."
        },
        {
            question: "Em 'Morreu a esperança', que tipo de sujeito temos?",
            options: ["Sujeito simples", "Sujeito composto", "Sujeito oculto", "Sujeito inexistente"],
            correct: 0,
            explanation: "'A esperança' é sujeito simples (um só núcleo)."
        },
        {
            question: "Qual função sintática exerce 'de saudade' em 'Morreu de saudade'?",
            options: ["Objeto direto", "Objeto indireto", "Adjunto adverbial", "Complemento nominal"],
            correct: 2,
            explanation: "'De saudade' é adjunto adverbial de causa."
        },
        {
            question: "O que é ANACOLUTO?",
            options: ["Repetição de palavras", "Quebra da estrutura sintática", "Exagero proposital", "Suavização de ideias"],
            correct: 1,
            explanation: "Anacoluto é a quebra da estrutura sintática esperada."
        },
        {
            question: "Em 'Quanto mais estudo, mais aprendo', temos uma oração:",
            options: ["Subordinada causal", "Subordinada proporcional", "Coordenada aditiva", "Subordinada temporal"],
            correct: 1,
            explanation: "'Quanto mais... mais' indica proporção entre as ações."
        },
        {
            question: "Qual é o processo de formação da palavra 'infelizmente'?",
            options: ["Composição", "Derivação prefixal e sufixal", "Derivação regressiva", "Hibridismo"],
            correct: 1,
            explanation: "In- (prefixo) + feliz + -mente (sufixo) = derivação prefixal e sufixal."
        },
        {
            question: "O que caracteriza o DISCURSO INDIRETO LIVRE?",
            options: ["Uso de travessão", "Mistura pensamento do personagem com narrador", "Apenas fala do narrador", "Uso de aspas"],
            correct: 1,
            explanation: "Discurso indireto livre mescla voz do narrador com pensamento do personagem."
        },
        {
            question: "Em 'Faz dois anos que não o vejo', o verbo 'faz' é:",
            options: ["Pessoal", "Impessoal", "Auxiliar", "De ligação"],
            correct: 1,
            explanation: "Verbo 'fazer' indicando tempo é impessoal (sem sujeito)."
        },
        {
            question: "Qual é a função de 'que' em 'O livro que comprei é bom'?",
            options: ["Conjunção", "Pronome relativo", "Advérbio", "Preposição"],
            correct: 1,
            explanation: "'Que' é pronome relativo, retoma 'livro' e inicia oração subordinada."
        },
        {
            question: "O que é CATACRESE?",
            options: ["Metáfora desgastada pelo uso", "Comparação explícita", "Exagero intencional", "Repetição de sons"],
            correct: 0,
            explanation: "Catacrese é metáfora que perdeu força expressiva pelo uso comum."
        },
        {
            question: "Em 'Espero que venhas', a oração subordinada é:",
            options: ["Substantiva objetiva direta", "Adjetiva restritiva", "Adverbial temporal", "Substantiva subjetiva"],
            correct: 0,
            explanation: "'Que venhas' é oração subordinada substantiva objetiva direta."
        },
        {
            question: "Qual é o efeito da ALITERAÇÃO?",
            options: ["Criar ritmo pela repetição de sons consonantais", "Exagerar uma ideia", "Suavizar uma crítica", "Comparar elementos"],
            correct: 0,
            explanation: "Aliteração repete sons consonantais criando efeito sonoro e rítmico."
        },
        {
            question: "O que é ZEUGMA?",
            options: ["Repetição de palavras", "Omissão de termo já expresso", "Inversão da ordem", "Contradição aparente"],
            correct: 1,
            explanation: "Zeugma omite termo já mencionado anteriormente na frase."
        },
        {
            question: "Em 'Nem tudo que reluz é ouro', temos um:",
            options: ["Ditado popular", "Provérbio", "Aforismo", "Todas as alternativas"],
            correct: 3,
            explanation: "A frase é simultaneamente ditado popular, provérbio e aforismo."
        },
        {
            question: "Qual é a diferença entre PARÁFRASE e PARÓDIA?",
            options: ["Não há diferença", "Paráfrase mantém sentido, paródia o altera", "Paródia mantém sentido, paráfrase o altera", "Ambas alteram o sentido"],
            correct: 1,
            explanation: "Paráfrase mantém o sentido original; paródia o modifica com humor/crítica."
        }
    ]
};

// Configuração de tempo por nível
const levelTimeConfig = {
    1: 30, // 30 segundos - Básico
    2: 25, // 25 segundos - Classes gramaticais
    3: 20, // 20 segundos - Sintaxe
    4: 18, // 18 segundos - Gêneros textuais
    5: 15, // 15 segundos - Literatura
    6: 12  // 12 segundos - Avançado
};

// Conquistas disponíveis
const achievements = {
    genius: { name: "Gênio do Português", desc: "Acerte todas do nível", icon: "🥇" },
    resistant: { name: "Resistente", desc: "Não perca vidas", icon: "💪" },
    comeback: { name: "Voltou por Cima", desc: "De 0 para o topo", icon: "🔁" },
    lightning: { name: "Relâmpago", desc: "Resposta em <10s", icon: "⚡" },
    marathon: { name: "Maratonista", desc: "Complete 3 níveis", icon: "🏃‍♂️" },
    perfectionist: { name: "Perfeccionista", desc: "100% de acertos", icon: "💯" }
};

// Configuração dos avatares
const avatarConfig = {
    blue: { emoji: '🦸‍♂️', color: '#2196F3' },
    red: { emoji: '🐉', color: '#FF1744' },
    yellow: { emoji: '⭐', color: '#FFD23F' },
    green: { emoji: '🌟', color: '#4CAF50' },
    purple: { emoji: '🦄', color: '#9C27B0' },
    orange: { emoji: '🦊', color: '#FF9800' }
};

// Função para embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para obter perguntas embaralhadas para um jogador
function getShuffledQuestions(player, level) {
    if (!player.shuffledQuestions[level]) {
        const originalQuestions = questionDatabase[level] || questionDatabase[1];
        player.shuffledQuestions[level] = shuffleArray(originalQuestions);
    }
    return player.shuffledQuestions[level];
}

// Funções de configuração
function selectAvatar(color) {
    selectedAvatar = color;
    document.querySelectorAll('.avatar-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-color="${color}"]`).classList.add('selected');
}

function addPlayer() {
    const name = document.getElementById('playerName').value.trim();
    if (!name) {
        alert('Digite um nome para o jogador!');
        return;
    }
    
    if (players.length >= 6) {
        alert('Máximo de 6 jogadores!');
        return;
    }
    
    if (players.find(p => p.name === name)) {
        alert('Este nome já foi usado!');
        return;
    }
    
    players.push({
        name: name,
        avatar: selectedAvatar,
        points: 0,
        lives: 3,
        eliminated: false,
        achievements: [],
        questionsAnswered: 0,
        correctAnswers: 0,
        currentLevel: 1,
        totalTime: 0,
        levelsCompleted: 0,
        shuffledQuestions: {} // Armazenar perguntas embaralhadas por nível
    });
    
    document.getElementById('playerName').value = '';
    updatePlayersDisplay();
    
    if (players.length >= 2) {
        document.getElementById('startBtn').style.display = 'inline-block';
    }
}

function updatePlayersDisplay() {
    const grid = document.getElementById('playersGrid');
    grid.innerHTML = '';
    
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = `player-card ${index === currentPlayerIndex && gameStarted ? 'active' : ''}`;
        
        const avatarConfigLocal = avatarConfig;
        
        card.innerHTML = `
            <div class="player-avatar" style="background: ${avatarConfigLocal[player.avatar].color}; color: ${player.avatar === 'yellow' ? '#333' : 'white'};">
                ${avatarConfigLocal[player.avatar].emoji}
            </div>
            <div class="player-name">${player.name}</div>
            <div class="player-stats">
                💰 ${player.points} pts<br>
                ❤️ ${player.lives} vidas<br>
                📚 Nível ${player.currentLevel}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function startGame() {
    if (players.length < 2) {
        alert('Adicione pelo menos 2 jogadores!');
        return;
    }
    
    gameStarted = true;
    gameStartTime = Date.now();
    currentPlayerIndex = 0;
    
    document.getElementById('setupSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'grid';
    
    updateCurrentPlayerDisplay();
    updateOnlinePlayersList();
    loadQuestion();
}

function updateCurrentPlayerDisplay() {
    const player = players[currentPlayerIndex];
    const config = avatarConfig[player.avatar];
    
    document.getElementById('currentAvatar').textContent = config.emoji;
    document.getElementById('currentAvatar').style.background = config.color;
    document.getElementById('currentAvatar').style.color = player.avatar === 'yellow' ? '#333' : 'white';
    
    document.getElementById('currentName').textContent = player.name;
    document.getElementById('currentPoints').textContent = player.points;
    
    // Atualizar vidas
    const livesDisplay = document.getElementById('livesDisplay');
    livesDisplay.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('span');
        heart.className = i < player.lives ? 'heart' : 'heart empty';
        heart.textContent = '❤️';
        livesDisplay.appendChild(heart);
    }
    
    // Atualizar progresso
    const progress = (player.questionsAnswered / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${player.questionsAnswered}/${totalQuestions}`;
    document.getElementById('levelText').textContent = `Nível ${player.currentLevel}`;
    
    // Atualizar tempo total
    const totalMinutes = Math.floor(player.totalTime / 60);
    const totalSeconds = player.totalTime % 60;
    document.getElementById('totalTime').textContent = 
        `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
}

function updateOnlinePlayersList() {
    const list = document.getElementById('onlinePlayersList');
    list.innerHTML = '';
    
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = `online-player ${index === currentPlayerIndex ? 'current' : ''} ${player.eliminated ? 'eliminated' : ''}`;
        
        const config = avatarConfig[player.avatar];
        
        playerDiv.innerHTML = `
            <div class="online-avatar" style="background: ${config.color}; color: ${player.avatar === 'yellow' ? '#333' : 'white'};">
                ${config.emoji}
            </div>
            <div class="online-info">
                <div class="online-name">${player.name}</div>
                <div class="online-stats">${player.points} pts • ${player.lives} ❤️ • Nv.${player.currentLevel}</div>
            </div>
        `;
        
        list.appendChild(playerDiv);
    });
}

function loadQuestion() {
    const player = players[currentPlayerIndex];
    const questions = getShuffledQuestions(player, player.currentLevel);
    
    if (player.questionsAnswered >= questions.length) {
        // Jogador completou o nível
        completeLevel();
        return;
    }
    
    const question = questions[player.questionsAnswered];
    
    // Atualizar interface
    const levelNames = {
        1: "🟢 NÍVEL 1 - GRAMÁTICA BÁSICA",
        2: "🟡 NÍVEL 2 - CLASSES GRAMATICAIS", 
        3: "🟠 NÍVEL 3 - SINTAXE BÁSICA",
        4: "🔵 NÍVEL 4 - GêNEROS TEXTUAIS",
        5: "🟣 NÍVEL 5 - LITERATURA",
        6: "🔴 NÍVEL 6 - DESAFIO AVANÇADO"
    };
    document.getElementById('levelBadge').textContent = levelNames[player.currentLevel] || `🔴 NÍVEL ${player.currentLevel} - EXPERT`;
    document.getElementById('questionText').textContent = question.question;
    
    // Atualizar opções
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.className = 'answer-btn';
        btn.disabled = false;
    });
    
    // Limpar feedback
    document.getElementById('feedbackArea').innerHTML = '';
    document.getElementById('nextBtn').style.display = 'none';
    
    // Iniciar timer com tempo baseado no nível
    startTimer();
    questionStartTime = Date.now();
}

function startTimer() {
    const player = players[currentPlayerIndex];
    timeLeft = levelTimeConfig[player.currentLevel] || 30;
    
    document.getElementById('timerDisplay').style.display = 'block';
    document.getElementById('timerNumber').textContent = timeLeft;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            timeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    document.getElementById('timerDisplay').style.display = 'none';
}

function updateTimerDisplay() {
    const timerNumber = document.getElementById('timerNumber');
    timerNumber.textContent = timeLeft;
    
    timerNumber.classList.remove('warning', 'danger');
    
    const player = players[currentPlayerIndex];
    const maxTime = levelTimeConfig[player.currentLevel] || 30;
    
    if (timeLeft <= Math.floor(maxTime * 0.25)) {
        timerNumber.classList.add('danger');
    } else if (timeLeft <= Math.floor(maxTime * 0.5)) {
        timerNumber.classList.add('warning');
    }
}

function timeUp() {
    stopTimer();
    
    const player = players[currentPlayerIndex];
    player.lives--;
    player.points = Math.max(0, player.points - 15);
    
    // Desabilitar botões
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Mostrar feedback
    document.getElementById('feedbackArea').innerHTML = 
        '<div class="feedback-wrong">⏰ Tempo esgotado! -15 pontos</div>';
    
    // Verificar eliminação
    if (player.lives <= 0) {
        player.eliminated = true;
        setTimeout(() => {
            alert(`😵 ${player.name} foi eliminado!`);
            checkGameEnd();
        }, 2000);
    } else {
        setTimeout(() => nextPlayer(), 2000);
    }
    
    updateCurrentPlayerDisplay();
    updateOnlinePlayersList();
}

function selectAnswer(answerIndex) {
    if (timerInterval) {
        stopTimer();
    }
    
    const player = players[currentPlayerIndex];
    const questions = getShuffledQuestions(player, player.currentLevel);
    const question = questions[player.questionsAnswered];
    
    // Calcular tempo de resposta
    const responseTime = Math.floor((Date.now() - questionStartTime) / 1000);
    player.totalTime += responseTime;
    
    // Desabilitar todos os botões
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => btn.disabled = true);
    
    // Marcar resposta selecionada
    answerBtns[answerIndex].classList.add('selected');
    
    setTimeout(() => {
        if (answerIndex === question.correct) {
            // Resposta correta
            answerBtns[answerIndex].classList.add('correct');
            
            // Pontuação baseada no nível e velocidade
            let basePoints = 10 + (player.currentLevel * 5);
            player.points += basePoints;
            player.correctAnswers++;
            
            let feedbackText = `✅ Acertou! +${basePoints} pontos`;
            
            // Bônus por velocidade
            if (responseTime < 10) {
                const speedBonus = 10;
                player.points += speedBonus;
                checkAchievement(player, 'lightning');
                feedbackText += ` ⚡ +${speedBonus} bônus velocidade!`;
            }
            
            document.getElementById('feedbackArea').innerHTML = 
                `<div class="feedback-correct">${feedbackText}</div>`;
            
            createConfetti();
            
        } else {
            // Resposta errada
            answerBtns[answerIndex].classList.add('wrong');
            answerBtns[question.correct].classList.add('correct');
            
            player.lives--;
            const penalty = 5 + (player.currentLevel * 2);
            player.points = Math.max(0, player.points - penalty);
            
            document.getElementById('feedbackArea').innerHTML = 
                `<div class="feedback-wrong">❌ Errou! -${penalty} pontos<br><small>${question.explanation}</small></div>`;
        }
        
        player.questionsAnswered++;
        
        // Verificar conquistas
        checkAchievements(player);
        
        // Mostrar botão próxima pergunta
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('nextBtn').textContent = 
            answerIndex === question.correct ? 'Próxima Pergunta ➡️' : 'Passar Vez ➡️';
        
        updateCurrentPlayerDisplay();
        updateOnlinePlayersList();
        
    }, 500);
}

function nextQuestion() {
    const player = players[currentPlayerIndex];
    
    if (player.questionsAnswered >= totalQuestions) {
        completeLevel();
    } else if (player.lives <= 0) {
        player.eliminated = true;
        alert(`😵 ${player.name} foi eliminado!`);
        checkGameEnd();
    } else {
        // Se errou, passa a vez
        const questions = getShuffledQuestions(player, player.currentLevel);
        const lastQuestion = questions[player.questionsAnswered - 1];
        const lastAnswerBtn = document.querySelector('.answer-btn.selected');
        const wasCorrect = lastAnswerBtn && lastAnswerBtn.classList.contains('correct');
        
        if (wasCorrect) {
            loadQuestion(); // Continua jogando
        } else {
            nextPlayer(); // Passa a vez
        }
    }
}

function nextPlayer() {
    const activePlayers = players.filter(p => !p.eliminated);
    if (activePlayers.length <= 1) {
        checkGameEnd();
        return;
    }
    
    // Encontrar próximo jogador ativo
    do {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    } while (players[currentPlayerIndex].eliminated);
    
    updateCurrentPlayerDisplay();
    updateOnlinePlayersList();
    loadQuestion();
}

function completeLevel() {
    const player = players[currentPlayerIndex];
    
    // Bônus de conclusão baseado no nível
    const levelBonus = 50 + (player.currentLevel * 25);
    player.points += levelBonus;
    player.levelsCompleted++;
    
    // Verificar conquistas
    if (player.correctAnswers === totalQuestions) {
        checkAchievement(player, 'genius');
    }
    
    if (player.lives === 3) {
        checkAchievement(player, 'resistant');
    }
    
    if (player.levelsCompleted >= 3) {
        checkAchievement(player, 'marathon');
    }
    
    alert(`🎉 ${player.name} completou o nível ${player.currentLevel}! +${levelBonus} pontos de bônus!`);
    
    // Avançar nível ou passar vez
    if (player.currentLevel < 6) {
        player.currentLevel++;
        player.questionsAnswered = 0;
        player.correctAnswers = 0;
        loadQuestion();
    } else {
        // Completou todos os níveis
        checkAchievement(player, 'perfectionist');
        alert(`🏆 ${player.name} é um MESTRE DO PORTUGUÊS! Completou todos os níveis!`);
        nextPlayer();
    }
}

function checkAchievements(player) {
    // Verificar conquista de comeback
    if (player.points > 50 && player.lives === 1) {
        checkAchievement(player, 'comeback');
    }
}

function checkAchievement(player, achievementId) {
    if (!player.achievements.includes(achievementId)) {
        player.achievements.push(achievementId);
        
        // Animar conquista
        const achievementEl = document.getElementById(`achievement-${achievementId}`);
        if (achievementEl) {
            achievementEl.classList.add('unlocked');
        }
        
        // Mostrar notificação
        setTimeout(() => {
            alert(`🏅 ${player.name} desbloqueou: ${achievements[achievementId].name}!`);
        }, 1000);
    }
}

function checkGameEnd() {
    const activePlayers = players.filter(p => !p.eliminated);
    
    if (activePlayers.length === 1) {
        const winner = activePlayers[0];
        createConfetti();
        setTimeout(() => {
            alert(`🏆 ${winner.name} VENCEU! 🏆\nPontuação final: ${winner.points} pontos\nNível alcançado: ${winner.currentLevel}\nTempo total: ${Math.floor(winner.totalTime/60)}:${(winner.totalTime%60).toString().padStart(2,'0')}`);
        }, 1000);
    } else if (activePlayers.length === 0) {
        alert('💀 Todos foram eliminados! Que tal tentar novamente?');
    }
}

function createConfetti() {
    const confetti = document.getElementById('confetti');
    confetti.innerHTML = '';
    
    const colors = ['#FFD23F', '#FF1744', '#2196F3', '#4CAF50', '#9C27B0'];
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 3 + 's';
        confetti.appendChild(piece);
    }
    
    setTimeout(() => {
        confetti.innerHTML = '';
    }, 3000);
}

function resetGame() {
    if (confirm('Tem certeza que deseja resetar o jogo?')) {
        stopTimer();
        players = [];
        gameStarted = false;
        currentPlayerIndex = 0;
        
        document.getElementById('setupSection').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('startBtn').style.display = 'none';
        
        updatePlayersDisplay();
    }
}

// Event listeners
document.getElementById('playerName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPlayer();
    }
});