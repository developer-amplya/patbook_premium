<template>

    <f7-block inner>

        <!-- Image -->
        <div class="image" @click="$refs.EditImagePopover.open()">
            <img ref="currentImage" src="../assets/placeholder_img.png"/>
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
    export default {
        name: 'ImageSelector',
        props: ['imagepath'],
        data() {
            return {
                //
            };
        },
        mounted() {
            console.log(this.imagepath)
        },
        methods: {
            // From camera
            getPictureFromCamera() {
                if (navigator.camera) {
                    navigator.camera.getPicture(this.showPicture, this.error, {
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
                    this.$f7.dialog.alert('Cámara no disponible', 'Atención');
                }
            },
            // From library
            getPictureFromLibrary() {
                if (navigator.camera) {
                    navigator.camera.getPicture(this.showPicture, this.error, {
                        quality: 50,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: Camera.DestinationType.FILE_URI,
                        encodingType: Camera.EncodingType.JPEG,
                        allowEdit: true,
                        correctOrientation: true,
                    });
                } else {
                    // If the navigator.camera is not available display generic error to the user.
                    this.$f7.dialog.alert('Galería no disponible', 'Atención');
                }
            },
            showPicture(imageURI) {
                this.$refs.currentImage.src = imageURI;

                // Close popover
                this.$refs.EditImagePopover.close();

                // Emit URI to parent
                this.$emit('image_selected', imageURI);
            }
        }
    };
</script>

<style scoped>

    .image img {
        width: 100%;
    }

</style>