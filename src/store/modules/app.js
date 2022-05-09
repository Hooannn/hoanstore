const app = {
    state: () => ({ 
        viewMode:'grid',
        sort:'Select',
        lowStartPrice:0,
        highStartPrice:100000,
        billKey:null,
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