<template>
    <div>
        <header class="top_tips">
            <span class="num_tips" v-if="fatherComponent == 'home'">{{level}}</span>
            <span class="num_tips" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
        </header>
        <div v-if="fatherComponent == 'home'">
            <div class="contai_logo home_logo"></div>
            <router-link to="/item" class="start button_style"></router-link>
        </div>
        <div v-if="fatherComponent == 'item'">
            <div class="contai_logo item_wrap" v-if="itemNum <= itemDetail.length">
                <div class="item_title">{{itemDetail[itemNum-1].topic_name}}</div>
                <ul>
                    <li v-for="(item, index) in itemDetail[itemNum-1].topic_answer" :key="item.topic_answer_id" @click="choosed(index,item.topic_answer_id)">
                        <span class="option_style" :class="{'has_choosed':chooseNum==index}">{{chooseType(index)}}</span>
                        <span class="item_option">{{item.answer_name}}</span>
                    </li>
                </ul>
            </div>
            <span class="next_style button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>
            <span to="/score" class="submit_style button_style" v-else @click="submitAnswer()"></span>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
    name: 'itemcontainer',
    data() {
        return {
            itemId: null,
            chooseNum: null,
            chooseId: null
        }
    },
    props: {
        fatherComponent: {
            type: String,
            required: true
        }
    },
    computed: mapState([
        'level', //活动周数
        'itemNum', // 第几题
        'itemDetail', //题目详情
        'timer' //定时器
    ]),
    methods: {
        ...mapMutations({
            addItemNum: 'ADD_ITEMNUM'
        }),
        chooseType(type) {
            switch(type) {
                case 0: return 'A'
                case 1: return 'B'
                case 2: return 'C'
                case 3: return 'D'
            }
        },
        choosed(type,id) {
            this.chooseNum = type
            this.chooseId = id
        },
        nextItem() {
            if(this.chooseNum !== null){
                this.chooseNum = null
                this.addItemNum()
            } else {
                alert('没选择答案')
            }
        },
        submitAnswer() {
            if(this.chooseNum !== null){
                this.addItemNum()
                this.$router.push('/score')
            } else {
                alert('没选择答案')
            }
        }
    }
}
</script>

<style lang="less">
    .top_tips{
        height: 147px;
        width: 65px;
        position: absolute;
        top: -20px;
        right: 32px;
        background: url('~assets/img/WechatIMG2.png') no-repeat;
        background-size: 100% 100%;
        z-index: 10;
        .num_tips{
            width: inherit;
            position: absolute;
            left: 0;
            bottom: 20px;
            font-size: 12px;
            font-family: '黑体';
            color: #a57c50;
            font-weight: 600;
            text-align: center;
        }
    }
    .home_logo{
        background-image: url('~assets/img/1-2.png');
    }
    .button_style{
        height: 42px;
        width: 87px;
        position: absolute;
        bottom: 190px;
        left: 50%;
        transform: translate(-50%,0);
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .contai_logo{
        height: 232px;
        width: 263px;
        position: absolute;
        top: 90px;
        left: 50%;
        transform: translate(-52%,0);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .item_wrap{
        background-image: url('~assets/img/2-1.png');
        text-align: left;
        padding: 43px 0 0 50px;
        .item_title{
            color: #00e;
        }
        .option_style{
            width: 22px;
            height: 22px;
            color: #00e;
            border: 1px solid #fff;
            border-radius: 50%;
            text-align: center;
            display: inline-block;
            line-height: 22px;
        }
        .item_option{
            color: #00e;
        }
        .has_choosed{
            background-color: #ffd400;
            border-color: #ffd400;
            color: #747474;
        }
    }
    .start{
        background-image: url('~assets/img/1-4.png');
    }
    .next_style{
        background-image: url('~assets/img/2-2.png');
    }
    .submit_style{
        background-image: url('~assets/img/3-1.png');
    }
</style>