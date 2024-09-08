class RecintosZoo {
    constructor() {

      // Lista de Recintos
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
      ];
      
      // Lista de Animais
      this.animais = {
        'LEAO': { tamanho: 3, bioma: ['savana'] },
        'LEOPARDO': { tamanho: 2, bioma: ['savana'] },
        'CROCODILO': { tamanho: 3, bioma: ['rio'] },
        'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
        'GAZELA': { tamanho: 2, bioma: ['savana'] },
        'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] },
      };
    }
  
    analisaRecintos(especie, quantidade) {
      // Verificar se o animal é válido
      if (!this.animais[especie]) {
        return { erro: "Animal inválido" };
      }
  
      // Verificar se a quantidade é válida
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }

  
      const resultado = [];
      const { tamanho, bioma } = this.animais[especie];
  
      // Percorrer recintos e verificar viabilidade
      this.recintos.forEach((recinto) => {
        const espacoOcupado = recinto.animais.reduce((acc, animal) => acc + animal.quantidade * this.animais[animal.especie].tamanho, 0);
        const espacoNecessario = quantidade * tamanho;
        const espacoDisponivel = recinto.tamanho - espacoOcupado;
        const biomaAdequado = bioma.includes(recinto.bioma);
  
        if (biomaAdequado && espacoDisponivel >= espacoNecessario) {
          // Verificar regras específicas
          const isCarnivoro = especie === 'LEAO' || especie === 'LEOPARDO' || especie === 'CROCODILO';
          const hasCarnivoro = recinto.animais.some(animal => animal.especie === 'LEAO' || animal.especie === 'LEOPARDO' || animal.especie === 'CROCODILO');
          
          if (isCarnivoro && hasCarnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== especie) {
            return;
          }
  
          const hasHipopotamo = recinto.animais.some(animal => animal.especie === 'HIPOPOTAMO');
          if (hasHipopotamo && recinto.bioma !== 'savana e rio') {
            return;
          }
  
          // Considerar espaço extra se houver mais de uma espécie
          const totalEspacoNecessario = espacoNecessario + (recinto.animais.length > 0 ? 1 : 0);
  
          if (espacoDisponivel >= totalEspacoNecessario) {
            const espacoLivre = recinto.tamanho - (espacoOcupado + totalEspacoNecessario);
            resultado.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
          }
        }
      });
  
      return resultado.length > 0 ? { recintosViaveis: resultado } : { erro: "Não há recinto viável" };
    }
  }
  
  