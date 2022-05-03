const app = {
    state: () => ({ 
        viewMode:'grid'
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