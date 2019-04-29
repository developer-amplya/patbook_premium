<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/home">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="Información del usuario"></f7-nav-title>
        </f7-navbar>

        <!-- Pic -->
        <user-pic></user-pic>

        <f7-block inner>

            <f7-card>

                <f7-list media-list>

                    <!-- Name -->
                    <f7-list-item header="Nombre"
                                  @click="openInputPopover($event, 'text', 'Nombre', 'name', getUserName)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserName }}</span>
                    </f7-list-item>

                    <!-- Lastname -->
                    <f7-list-item header="Apellidos"
                                  @click="openInputPopover($event, 'text', 'Apellidos', 'lastname', getUserLastname)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserLastname }}</span>
                    </f7-list-item>

                    <!-- Birthdate -->
                    <f7-list-item header="Fecha de nacimiento"
                                  @click="openInputPopover($event, 'date', 'Fecha de nacimiento', 'birthdate', getUserBirthdate)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserBirthdate }}</span>
                    </f7-list-item>

                    <!-- Sex -->
                    <f7-list-item header="Sexo"
                                  @click="openSelectPopover($event, 'sexList', 'Sexo', 'sex', getUserSex)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserSex }}</span>
                    </f7-list-item>

                    <!-- Weight -->
                    <f7-list-item header="Peso"
                                  @click="openInputPopover($event, 'number', 'Peso', 'weight', getUserWeight)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserWeight }}</span>
                    </f7-list-item>

                    <!-- Height -->
                    <f7-list-item header="Altura"
                                  @click="openInputPopover($event, 'number', 'Altura', 'height', getUserHeight)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserHeight }}</span>
                    </f7-list-item>

                </f7-list>

            </f7-card>
            <br>
            <f7-card>

                <f7-list media-list>

                    <!-- Country -->
                    <f7-list-item header="País"
                                  @click="openSelectPopover($event, 'countriesList', 'País', 'country', getUserCountry)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserCountry }}</span>
                    </f7-list-item>

                    <!-- Address -->
                    <f7-list-item header="Dirección"
                                  @click="openInputPopover($event, 'text', 'Dirección', 'address', getUserAddress)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserAddress }}</span>
                    </f7-list-item>

                    <!-- Phone -->
                    <f7-list-item header="Teléfono"
                                  @click="openInputPopover($event, 'number', 'Teléfono', 'phone', getUserPhone)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserPhone }}</span>
                    </f7-list-item>

                </f7-list>

            </f7-card>
            <br>
            <f7-card>

                <f7-list media-list>

                    <!-- Profession -->
                    <f7-list-item header="Profesión"
                                  @click="openInputPopover($event, 'text', 'Profesión', 'profession', getUserProfession)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserProfession }}</span>
                    </f7-list-item>

                    <!-- Company -->
                    <f7-list-item header="Empresa"
                                  @click="openInputPopover($event, 'text', 'Empresa', 'company', getUserCompany)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserCompany }}</span>
                    </f7-list-item>

                </f7-list>

            </f7-card>
            <br>
            <f7-card>

                <f7-list media-list>

                    <!-- Blood type -->
                    <f7-list-item header="Grupo sanguíneo"
                                  @click="openSelectPopover($event, 'bloodTypesList', 'Grupo sanguíneo', 'blood_type', getUserBloodType)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getUserBloodType }}</span>
                    </f7-list-item>

                </f7-list>

            </f7-card>
            <br>
            <f7-card>

                <f7-list media-list>

                    <!-- Clinic name -->
                    <f7-list-item header="Centro de salud"
                                  @click="openInputPopover($event, 'text', 'Centro de salud', 'clinic', getClinicName)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getClinicName }}</span>
                    </f7-list-item>

                    <!-- Clinic address -->
                    <f7-list-item header="Dirección del centro de salud"
                                  @click="openInputPopover($event, 'text', 'Dirección del centro de salud', 'clinic_address', getClinicAddress)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getClinicAddress }}</span>
                    </f7-list-item>

                    <!-- Clinic phone -->
                    <f7-list-item header="Teléfono del centro de salud"
                                  @click="openInputPopover($event, 'number', 'Teléfono del centro de salud', 'clinic_phone', getClinicPhone)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ getClinicPhone }}</span>
                    </f7-list-item>

                </f7-list>

            </f7-card>

        </f7-block>

        <!-- Input popover -->
        <f7-popover ref="EditInputField">
            <text-input :type="field.type"
                        :label="field.label"
                        :name="field.name"
                        :value="field.value"
                        @input="setInputValue"></text-input>
            <f7-block>
                <f7-segmented round raised>
                    <f7-button round @click="$refs.EditInputField.close()">Cancelar</f7-button>
                    <f7-button round @click="updateInfo($event, field.name)">Guardar</f7-button>
                </f7-segmented>
            </f7-block>
        </f7-popover>

        <!-- Select popover -->
        <f7-popup ref="EditSelectField">
            <select-list :type="field.type"
                         :label="field.label"
                         :name="field.name"
                         :value="field.value"
                         @select="setSelectValue"></select-list>
        </f7-popup>

    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../config.js';
    import {
        mapGetters
    } from 'vuex';
    import TextInput from '../form_elements/TextInput';
    import SelectList from '../form_elements/SelectList';
    import UserPic from '../form_elements/UserPic';

    export default {
        name: 'UserInfo',
        components: {
            TextInput,
            SelectList,
            UserPic
        },
        data() {
            return {
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: ''
                },
                user_info: {
                    name: 'setUserName',
                    lastname: 'setUserLastname',
                    pic: 'setUserProfileImg',
                    birthdate: 'setUserBirthdate',
                    sex: 'setUserSex',
                    weight: 'setUserWeight',
                    height: 'setUserHeight',
                    country: 'setUserCountry',
                    address: 'setUserAddress',
                    phone: 'setUserPhone',
                    profession: 'setUserProfession',
                    company: 'setUserCompany',
                    blood_type: 'setUserBloodType',
                    clinic: 'setClinicName',
                    clinic_address: 'setClinicAddress',
                    clinic_phone: 'setClinicPhone'
                }
            };
        },
        computed: {
            ...mapGetters([
                'getUserID',
                'getUserEmail',
                'getUserName',
                'getUserLastname',
                'getUserBirthdate',
                'getUserSex',
                'getUserWeight',
                'getUserHeight',
                'getUserCountry',
                'getUserAddress',
                'getUserPhone',
                'getUserProfession',
                'getUserCompany',
                'getUserBloodType',
                'getClinicName',
                'getClinicAddress',
                'getClinicPhone'
            ])
        },
        methods: {
            openInputPopover($event, type, label, name, value) {
                this.field.type = type;
                this.field.label = label;
                this.field.name = name;
                this.field.value = value;
                this.$refs.EditInputField.open();
            },
            openSelectPopover($event, type, label, name, value) {
                this.field.type = type;
                this.field.label = label;
                this.field.name = name;
                this.field.value = value;
                this.$refs.EditSelectField.open();
            },
            setInputValue(e) {
                this.field.value = e;
            },
            setSelectValue(e) {
                this.field.value = e;
                this.updateInfo(event, this.field.name);
                this.$refs.EditSelectField.close();
            },
            updateInfo(event, param) {
                let data = {};
                data['id'] = this.getUserID;
                data['key'] = param;
                data['value'] = this.field.value;

                axios({
                    method: 'POST',
                    url: API_PATH + 'user/update',
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    data: data
                })
                    .then((response) => {
                        //console.log(response);
                        if (response.data.result === 'OK') {

                            this.$store.dispatch(this.user_info[param], this.field.value);

                            // Close popover
                            this.$refs.EditInputField.close();
                        } else {
                            // TODO ??
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            test(e) {
                //console.log(e);
            }
        }
    };
</script>

<style scoped>

    li i.icon {
        /*position: absolute;
        left: 15px;
        top: 20px;*/
        color: #9a9a9a !important;
        background: #eeeeee;
        padding: 5px;
        border-radius: 50%;
        opacity: .65;
    }

    li span {
        position: relative;
        z-index: 10;
    }

    .md .list .item-header {
        padding-left: 39px !important;
    }

    .md .navbar {
        background-color: #1ABAD4 !important;
    }

</style>