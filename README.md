# 📍 Documentação Técnica do Sistema de Geolocalização

## 📝 Visão Geral do Projeto

Este documento descreve um **aplicativo móvel desenvolvido em React Native** que opera como uma solução abrangente para a gestão e processamento de dados de localização. O sistema integra diversas bibliotecas e serviços para oferecer capacidades completas de geolocalização. As funções primárias incluem a **aquisição da posição geográfica atual** do usuário, a **conversão de coordenadas** brutas em endereços textuais compreensíveis (geocodificação reversa) e a **persistência** dessas informações em uma base de dados.

---

## 💻 Componentes e Dependências

A arquitetura do aplicativo baseia-se na integração de componentes nativos do React Native com bibliotecas externas especializadas.

### **Núcleo React e React Native**

| Componente | Finalidade |
| :--- | :--- |
| `useState`, `useEffect` | **Hooks** essenciais para gerenciamento de estado e controle de efeitos colaterais no ciclo de vida dos componentes. |
| `View`, `Text`, `StyleSheet`, `ScrollView` | Elementos fundamentais para a **construção da interface** e organização visual. |
| `ActivityIndicator` | **Indicador visual** de processamento em andamento (carregamento). |
| `Alert` | Ferramenta para **notificações e interações** cruciais com o usuário (mensagens, confirmações). |

### **Serviços Externos e Bibliotecas**

| Dependência | Função Primária |
| :--- | :--- |
| **`expo-location`** | Habilita o acesso aos **serviços de localização** do dispositivo, permitindo a obtenção das coordenadas atuais (GPS). |
| **`supabase`** | Cliente de **persistência de dados** (Banco de Dados). Responsável por armazenar e recuperar as localizações registradas. |
| **`axios`** | Biblioteca dedicada à execução de **requisições HTTP**, notavelmente utilizada para comunicação com APIs de geocodificação. |

---

## 🗃️ Interfaces TypeScript (Estrutura de Tipos)

O sistema de tipos em TypeScript garante a integridade e previsibilidade dos dados manipulados pelo aplicativo.

### **`LocationData`**
Define o molde estrutural para coordenadas geográficas primárias:

* `latitude`: Número real no intervalo de \[-90, 90] graus (coordenada vertical).
* `longitude`: Número real no intervalo de \[-180, 180] graus (coordenada horizontal).
    > *Uso:* Representa qualquer ponto geográfico bruto, como a localização atual do dispositivo.

### **`SavedLocation`**
Descreve o formato completo dos dados armazenados no banco de dados:

* `id`: **Identificador único** (UUID provável) da localização persistida.
* `latitude`, `longitude`: Coordenadas geográficas.
* `address`: O **endereço textual** formatado, resultante da geocodificação reversa.
* `created_at`: **Timestamp** que registra o momento exato do salvamento.

### **`ReverseGeocodeResponse`**
Define a estrutura esperada na resposta de uma API externa de geocodificação reversa:

* `street`: Nome da rua.
* `city`: Cidade.
* `country`: País.
* `postalCode`: Código postal.
* *Outros campos opcionais de endereço.*
    > *Observação:* Esta interface é projetada para ser tolerante a diferentes formatos de resposta de provedores de API.

---

## ⚙️ Funcionalidades Chave

### **Aquisição de Localização em Tempo Real**

O sistema emprega o `expo-location` para a **captura de dados geográficos**. O processo inicia com a **solicitação explícita de permissão** ao usuário. Uma vez concedida, as coordenadas GPS são obtidas e armazenadas no estado da aplicação para uso imediato.

### **Persistência de Dados (Banco de Dados)**

Através do cliente Supabase, o aplicativo gerencia o ciclo de vida dos dados de localização. Isso abrange a **inserção** de registros (coordenadas, endereço convertido e metadados) e a **recuperação** de localizações salvas para exibição ao usuário.

### **Geocodificação Reversa (Coordenadas para Endereço)**

Esta é uma função crítica que traduz coordenadas numéricas (latitude/longitude) em uma **representação de endereço legível**. Utiliza-se a biblioteca `axios` para orquestrar uma requisição HTTP a uma API de geocodificação reversa, enviando as coordenadas e recebendo em retorno informações detalhadas como logradouro, localidade e CEP.

---

## ➡️ Fluxo de Operação do Aplicativo

O ciclo de vida de uma interação de localização segue a seguinte sequência lógica:

1.  **Validação de Acesso:** O aplicativo solicita as permissões necessárias para acessar os serviços de localização do dispositivo.
2.  **Captura Geográfica:** Se a permissão for concedida, as coordenadas GPS atuais são obtidas.
3.  **Processamento de Endereço:** As coordenadas são submetidas a uma API externa para **conversão em um endereço textual** (geocodificação).
4.  **Registro de Dados:** As informações completas (coordenadas e endereço) são **salvas no banco de dados** Supabase.
5.  **Apresentação:** As localizações previamente salvas são consultadas no banco de dados e **apresentadas em formato de lista** para o usuário.
