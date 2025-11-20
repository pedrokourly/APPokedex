# APPokedex

APPokedex é uma aplicação mobile desenvolvida em **React Native** que funciona como uma Pokédex digital completa. O projeto consome dados da [PokéAPI](https://pokeapi.co/) para exibir informações detalhadas sobre Pokémons, oferecendo recursos de navegação, busca e persistência de dados.

Este projeto foi desenvolvido com foco em boas práticas de desenvolvimento mobile, arquitetura limpa e experiência do usuário.

## 📋 Funcionalidades

### Funcionalidades Principais
- **Listagem de Pokémons**: Exibição de lista com rolagem infinita (paginação) para carregamento progressivo dos dados.
- **Busca e Filtros**: Sistema de busca por nome ou número (ID) e filtragem por tipo elemental (Fogo, Água, etc.).
- **Detalhes do Pokémon**: Tela dedicada com informações completas, incluindo:
  - Estatísticas base (HP, Ataque, Defesa, etc.) com visualização gráfica.
  - Tipos, peso, altura e habilidades.
  - Arte oficial em alta resolução.
- **Interface Dinâmica**: As cores da interface se adaptam automaticamente ao tipo principal do Pokémon visualizado.

### Funcionalidades Adicionais
- **Sistema de Favoritos**: Persistência local de dados utilizando `AsyncStorage`, permitindo ao usuário salvar e gerenciar sua lista de Pokémons favoritos.
- **Reprodução de Áudio**: Integração com `expo-av` para reprodução dos sons característicos (cries) de cada Pokémon.
- **Animações**: Implementação de transições suaves e animações de entrada nos cards para uma interface mais fluida.

## 🛠️ Tecnologias Utilizadas

- **React Native** (Expo SDK)
- **React Navigation** (Navegação entre telas)
- **Axios** (Consumo de API REST)
- **AsyncStorage** (Armazenamento local)
- **Expo AV** (Manipulação de áudio)
- **Context API** (Gerenciamento de estado global)

## 🚀 Como Executar o Projeto

Pré-requisitos: Node.js e npm/yarn instalados.

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/APPokedex.git
   cd APPokedex
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute a aplicação**
   ```bash
   npx expo start
   ```

4. **Visualize no dispositivo**
   - Utilize o aplicativo **Expo Go** no seu celular (Android ou iOS) para escanear o QR Code gerado no terminal.
   - Ou execute em um emulador configurado (`npm run android` ou `npm run ios`).

## 📂 Estrutura do Projeto

O código está organizado dentro da pasta `src/` seguindo uma estrutura modular:

- `api/`: Configuração do Axios e funções de requisição.
- `components/`: Componentes reutilizáveis de UI (Cards, Filtros, Barras de Status).
- `context/`: Gerenciamento de estado global (Favoritos).
- `navigation/`: Configuração das rotas e navegação do app.
- `screens/`: Telas principais da aplicação (Home, Details, Favorites).
- `theme/`: Definições de estilo e paleta de cores.
- `utils/`: Funções auxiliares e formatadores.

---

**Autor**: Pedro Kourly
