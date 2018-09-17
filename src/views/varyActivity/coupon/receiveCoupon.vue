<template>
	<div id="receive-coupon">
        <div class="wrapper">
            <div class="coupon-content">
                <div class="coupon-item" @click.stop.prevent="getCoupon(hongbao)">
                    <div class="price">
                        <div><span class="money-icon">¥</span><span>{{couponList.price/100}}</span></div>
                        <span>{{couponList.typeStr}}</span>
                    </div>
                    <div class="content-area">
                        <p>{{couponList.name}}</p>
                        <p class="content-area-detail"><i>· </i> <span>{{couponList.note}}</span></p>
                        <p class="content-area-detail"><i>· </i> <span>不可以与店铺优惠券一起使用</span></p>
                    </div>
                    <div class="get-coupon"></div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import Toast from '@/components/toast.js';
import verify from '@/utils/verify.js';
import apiService from '@/api/activity.js';
import {checkApp,goApplicationLogin} from '@/utils/mobile.js';
import formData from '@/utils/formData.js';
export default {
    name: 'receiveCoupon',
    data() {
        return {
            hongbao: this.$route.query.hongbao || verify.getUrlQuery('hongbao'),
            couponList:{}, // 优惠券详细信息
            couponFlag:true, //防止重复点击,
            successTips:''
        }
    },
    methods: {
        getCouponInfo() {
            let _this = this;
            if(!_this.hongbao) {
                return ;
            }
            apiService.getCouponInfo(_this.hongbao).then(resp => {
                _this.couponList = resp.data.bonusModel || {};
            }).catch(err => {
                Toast('网络错误，请稍后重试');
            });
        },
        getCoupon(activity){
            if(!this.couponFlag) {
                return;
            }
            let token = formData.getUserToken();
            let params = {
                "receiveStatus": "CANRECEIVE",
                "activityBtn": activity
            };
            this.couponFlag = false;
            apiService.getDFCoupon(params).then(resp => {
                if(resp.code == 200){
                    let bonus = resp.data || [];
                    let num = bonus.length || 0;
                    if (num == 1) {
                        this.successTips = '恭喜您成功领取' + bonus[0].echoBonusModel.name;
                        Toast( this.successTips);
                    } else {
                        this.successTips = '恭喜您成功领取' + num + '张优惠券';
                        Toast( this.successTips);
                    }
                }else if(resp.code == 400) {
                    Toast(resp.message);
                } else if (resp.code == 401) {
                    if(checkApp()) {
                       goApplicationLogin();
                    } else {
                        Toast('请先登录');
                    }
                } else {
                   Toast(resp.message);
                }
                this.couponFlag = true;
            }).catch(e=>{
                Toast('网络错误，请稍后重试');
                this.couponFlag = true;
            });
        },
    },
    mounted() {
        this.getCouponInfo();
    }
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
    }

	div,img,a{padding:0;margin:0;display:block;border:0;}
    #receive-coupon {
        .coupon-content {
            width: calRem(690rem);
            margin: calRem(30rem) auto 0;
            .coupon-item {
                position:relative;
                height: calRem(180rem);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom:calRem(24rem);
                background: url("../../../assets/img/varyActivity/coupon/receiveCoupon/coupon_bg.png") 0 0 no-repeat;
                background-size: 100%;
                & .price {
                    color: #fff;
                    width: calRem(200rem);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    &>div {
                        font-size:calRem(48rem);
                        line-height:calRem(66rem);
                        & .money-icon {
                            font-size:calRem(24rem);
                            line-height:calRem(34rem);
                        }
                    }
                    &>span {
                        font-size:calRem(22rem);
                        line-height:calRem(32rem);
                    }
                }
                & .content-area {
                    height: 100%;
                    width:calRem(460rem);
                    padding-left:calRem(40rem);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    &>p {
                        width: 100%;
                        font-size:calRem(22rem);
                        text-align: left;
                        color: #888;
                        line-height:calRem(32rem);
                        display:block;
                        &:first-child {
                            line-height:calRem(40rem);
                            color: #333;
                            font-size:calRem(28rem);
                            margin-bottom:calRem(8rem);
                        }
                    }
                    &>p:first-child{
                        width: calRem(360rem);
                    }
                    .content-area-detail {
                        // display:list-item;
                        // list-style:disc;
                        display:flex;
                        box-sizing:border-box;
                        padding-right:calRem(14rem);
                        i {
                            margin-right:calRem(10rem);
                        }
                        span {
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }
                    }
                }
                & .get-coupon {
                    width:calRem(116rem);
                    height:calRem(44rem);
                    position:absolute;
                    top:calRem(24rem);
                    right:0;
                    background: url("../../../assets/img/varyActivity/coupon/receiveCoupon/get_coupon.png") 0 0 no-repeat;
                    background-size: 100%;
                }
            }
        }
    }
</style>
