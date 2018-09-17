<template>
  <div class="cityPicker">
      <div class="cityCon" v-if="true">
        <div class="pickerTab">
          <span class="cancel" @click.stop.prevent="cancelAddress">取消</span>
          <span class="confirm" @click.stop.prevent="confirmAddress">确定</span>
        </div>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      </div>

      <div class="pickerMask" v-if="true"></div>
  </div>
</template>

<script>
  import Picker from 'mint-ui/lib/picker';
  import myaddress from '@/json/address/pca.json'          //引入省市区数据
  export default {
    name: 'cityPicker',
    components: {
      'mt-picker': Picker
    },
    props: {
      defaultSelect: {
        type: Object,
        default: function () {
          return {
            province:'',
            city:    '',
            regoin:  ''
          }
        }
      }
    },
    data () {
      return {
        showPicker: false,
        areaPicker:'',
        provinceDftIndex:'',
        cityDftIndex    :'',
        regoinDftIndex  :'',
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 0,
            values: Object.keys(myaddress),    //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            defaultIndex: 0,
            values: Object.keys(myaddress['北京市']),
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            defaultIndex: 0,
            values: myaddress['北京市']['市辖区'],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince:'省',
        myAddressCity:'市',
        myAddresscounty:'区/县',
      }
    },
    methods: {
      cancelAddress() {
        this.$emit('close');
      },
      confirmAddress() {
        let arg = {
          province:this.myAddressProvince,
          city    :this.myAddressCity,
          regoin  :this.myAddresscounty
        }
        this.$emit('select',arg);
        this.showPicker = false;
        this.setDefaultValues();
      },
      onMyAddressChange(picker, values) {
        if(myaddress[values[0]]){
          picker.setSlotValues(1,Object.keys(myaddress[values[0]]));
          picker.setSlotValues(2,myaddress[values[0]][values[1]]);
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }
      },
      findProvinceIndex(province) {
        let provienceLen = Object.keys(myaddress).length;
        for(let i =0; i< provienceLen;i++) {
          if(province == Object.keys(myaddress)[i]) {
            return i;
          }
        }
        return 0;
      },
      findCityIndex(city) {
        let citiesLen = Object.keys(myaddress[this.defaultSelect.province]).length;
        for(let i =0; i< citiesLen;i++) {
          if(city == Object.keys(myaddress[this.defaultSelect.province])[i]) {
            return i;
          }
        }
        return 0;
      },
      findRegoinIndex(regoin) {
        let regoinsLen = myaddress[this.defaultSelect.province][this.defaultSelect.city].length;
        for(let i =0; i< regoinsLen;i++) {
          if(regoin == myaddress[this.defaultSelect.province][this.defaultSelect.city][i]) {
            return i;
          }
        }
        return 0;
      },
      setDefaultValues() {
        console.log(this.defaultSelect.province)
        if(this.defaultSelect.province&&this.defaultSelect.city&&this.defaultSelect.regoin) {
          let province = this.defaultSelect.province;
          let city = this.defaultSelect.city;
          let regoin = this.defaultSelect.regoin;
          this.provinceDftIndex = this.findProvinceIndex(province);
          this.cityDftIndex = this.findCityIndex(city);
          this.regoinDftIndex = this.findRegoinIndex(regoin);
          this.$nextTick(() => {
            this.myAddressSlots[0].defaultIndex = this.provinceDftIndex;

            this.myAddressSlots[2].values = Object.keys(myaddress[province]);
            this.myAddressSlots[2].defaultIndex = this.cityDftIndex;

            this.myAddressSlots[4].values = myaddress[province][city];
            this.myAddressSlots[4].defaultIndex = this.regoinDftIndex;
          });
        }
      }
    },
    mounted(){
      console.log('picker')
      this.setDefaultValues();

    },
  }
</script>

<style scoped lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){@return ($px-input/$real-px);}
  div,img,a{padding:0;margin:0;display:block;border:0;}
  .fade-enter-active {
    transition: all .5s ease;
  }
  .fade-leave-active {
    transition: all .5s ease;
  }
  .fade-enter, .fade-leave-active {
    transform: translateY(10px);
    opacity: 0;
  }
  .no-mode-fade-enter-active, .no-mode-fade-leave-active {
    transition: all 0.5s
  }
  .no-mode-fade-enter, .no-mode-fade-leave-active {
    opacity: 0;
  }
  .no-mode-fade-enter {
    transform: translateY(200px);
  }
  .no-mode-fade-leave-active {
    transform: translateY(200px);
  }
  .cityPicker {
    .cityCon {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #fff;
      z-index: 102;
      .pickerTab {
        box-sizing: border-box;
        width: 100%;
        padding: 0 calRem(20rem);
        height: calRem(44rem);
        background: #fbf9fe;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: calRem(1rem) solid #eee;
        & .cancel {
          font-size: calRem(16rem);
          color: #828282;
        }
        & .confirm {
          font-size: calRem(16rem);
          color: #69afff;
        }
      }
    }
    .pickerMask {
      position: absolute;
      left: 0;right: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      z-index: 101;
    }
  }
</style>
