<template>
  <f7-page>
    <f7-navbar title="Menú"></f7-navbar>
    <f7-list>
      <f7-list-item link="/use-guides/register-access" title="Guía de Registro y Acceso" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/privacy-policy" title="Protección de Datos" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/terms-and-conditions" title="Términos y condiciones" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/send-feedback" title="Enviar comentarios" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/reset-store" title="Salir" view="#main-view" panel-close></f7-list-item>
    </f7-list>

    <f7-toolbar position="bottom" no-shadow no-hairline>
      <!-- Version -->
      <div class="version">
        <small>v. 1.0.131</small>
      </div>
    </f7-toolbar>
  </f7-page>
</template>

<script>
export default {}
</script>

<style scoped>
  .toolbar {
    background-color: transparent !important;
  }
  .version {
    position: absolute;
    padding-top: 6px;
    right: 10px;
    color: rgba(255, 255, 255, 0.75);
  }
</style>