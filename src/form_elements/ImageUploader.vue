<template>

    <f7-block inner>

        <!-- Image -->
        <div class="col">
            <i class="icon material-icons">edit</i>
            <div class="image" @click="$refs.EditImagePopover.open()">
                <img ref="currentImage" :src="USER_IMAGES_PATH + "/>
            </div>
        </div>

        <!-- Popover -->
        <f7-popover ref="EditImagePopover">
            <f7-block-title>AÑADIR UNA IMAGEN...</f7-block-title>
            <f7-list>
                <f7-list-item title="Tomar una foto" link="#" @click="getPictureFromCamera"></f7-list-item>
                <f7-list-item title="Elegir desde la galería" link="#" @click="getPictureFromLibrary"></f7-list-item>
            </f7-list>
        </f7-popover>

    </f7-block>

</template>

<script>
    import axios from 'axios';
    import {
        USER_IMAGES_PATH, API_PATH
    } from '../config.js';
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: 'UserPic',
        props: {

        },
        data() {
            return {
                USER_IMAGES_PATH: USER_IMAGES_PATH
            };
        },
        computed: {
            ...mapGetters(['getUserProfileImg', 'getUserID'])
        },
        methods: {
            // From camera
            getPictureFromCamera() {
                if (navigator.camera) {
                    navigator.camera.getPicture(this.setPicture, this.error, {
                        quality: 50,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        destinationType: Camera.DestinationType.FILE_URI,
                        encodingType: Camera.EncodingType.JPEG,
                        allowEdit: true,
                        correctOrientation: true,
                        targetWidth: 1920,
                        targetHeight: 1920
                    });
                } else {
                    // If the navigator.camera is not available display generic error to the user.
                    alert('Cámara no disponible');
                }
            },
            // From library
            getPictureFromLibrary() {
                if (navigator.camera) {
                    navigator.camera.getPicture(this.setPicture, this.error, {
                        quality: 50,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: Camera.DestinationType.FILE_URI,
                        encodingType: Camera.EncodingType.JPEG,
                        allowEdit: true,
                        correctOrientation: true,
                    });
                } else {
                    // If the navigator.camera is not available display generic error to the user.
                    alert('Cámara no disponible');
                }
            },
            setPicture(imageURI) {
                /*
                                let bodyFormData = new FormData();
                                bodyFormData.append('name', 'pic');
                                bodyFormData.append('file', imageURI);

                                axios({
                                    method: 'post',
                                    url: API_PATH + 'user/update-pic',
                                    headers: {
                                        'Content-Type': 'image/jpeg'
                                    },
                                    data: bodyFormData
                                })
                                    .then((response) => {
                                        console.log(response);

                                        let fileName = image.substr(image.lastIndexOf('/') + 1);
                                        this.$store.dispatch('setUserProfileImg', fileName);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                */

                let uri = encodeURI(API_PATH + 'user/update-pic');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: this.getUserID
                };

                var ft = new FileTransfer();
                ft.upload(imageURI, uri, this.success, this.error, options);
            },
            success(response) {
                console.log(response);
                response = JSON.parse(response.response);
                this.$store.dispatch('setUserProfileImg', response.image_name);

                // Close popover
                this.$refs.EditUserPicPopover.close();
            }
        }
    };
</script>

<style scoped>

    .col i.icon {
        position: absolute;
        top: 36px;
        left: 50%;
        transform: translate(-66px);
        color: #BEBEBE !important;
        background-color: #F4F4F4;
        padding: 5px;
        border-radius: 50%;
    }

    .user-pic {
        width: 100px;
        height: 100px;
        margin: 20px auto 0px;
        overflow: hidden;
        border: 3px solid #1ABAD4;
        border-radius: 100%;
    }

    .user-pic img {
        width: 100%;
    }

</style>