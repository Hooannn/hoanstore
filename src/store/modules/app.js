const app = {
    state: () => ({ 
        viewMode:'grid',
        sort:'Default',
        lowStartPrice:0,
        highStartPrice:100000,
        billKey:null,
        topProduct:'best-seller'
    }),
    mutations: { 
        
    },
    actions: { 
      loading() {
        let loader=document.querySelector('#app > div.loading-view')
        loader.classList.add('show')
      },
      unload() {
        let loader=document.querySelector('#app > div.loading-view')
        loader.classList.remove('show')
      },
    },
    getters: { 
        
    }
  }
export default app