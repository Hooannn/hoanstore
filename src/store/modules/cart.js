const cart = {
    state: () => ({ 
      cart:[],
      orderInformation:{
        name:'',
        email:'',
        phone:'',
        address:'',
      },
      cartTotal:0,
      rstKey:0,
      description:"",
      wishlist:[],
    }),
    mutations: { 
        ADD_TO_CART(state,item) {
          state.cart.push(item)
        },
        ADD_TO_WISHLIST(state,item) {
          state.wishlist.push(item)
        }
    },
    actions: { 
        addCart({commit},item) {
          commit('ADD_TO_CART',item)
        },
        addWishlist({commit},item) {
          commit('ADD_TO_WISHLIST',item)
        }
    },
    getters: { 
        
    }
  }
export default cart