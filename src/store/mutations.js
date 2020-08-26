import { ADD_ITEMNUM} from './mutations-types'
export default {
    [ADD_ITEMNUM] (state) {
        state.itemNum += 1
    }
}