<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfImage } from '@storefront-ui/vue';

export default defineComponent({
  extends: SfImage,
  props: {
    placeholder: {
      type: String,
      default: () => '/default_image.png'
    }
  },
  computed: {
    attributes() {
      return this.imageTag === 'img' || this.imageTag === ''
        ? {
          ...this.$attrs,
          sizes: this.sizes,
          srcset: this.srcset,
          width: this.width ? this.width : null,
          height: this.height ? this.height : null
        }
        : {
          ...this.$attrs,
          width: this.width ? this.width : null,
          height: this.height ? this.height : null,
          ...this.nuxtImgConfig
        };
    }
  }
});
</script>
