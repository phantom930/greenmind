<template>
  <SfAccordion
    open=""
    :multiple="false"
    transition=""
    show-chevron
  >
    <SfAccordionItem header="Clothing">
      <SfList>
        <SfListItem>
          <SfMenuItem
            label="All"
            count="280"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            label="Skirts"
            count="11"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            label="Dresses"
            count="32"
          />
        </SfListItem>
      </SfList>
    </SfAccordionItem>
    <SfAccordionItem header="Accessories">
      <SfList>
        <SfListItem>
          <SfMenuItem
            label="All"
            count="80"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            label="Belts"
            count="101"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            label="Bag"
            count="2"
          />
        </SfListItem>
      </SfList>
    </SfAccordionItem>
    <SfAccordionItem header="Shoes">
      <SfList>
        <SfListItem>
          <SfMenuItem
            label="All"
            count="2"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            label="Trainers"
            count="22"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            label="Sandals"
            count="55"
          />
        </SfListItem>
      </SfList>
    </SfAccordionItem>
  </SfAccordion>
</template>

<script>
import { SfAccordion, SfList } from '@storefront-ui/vue';
export default {
  components: {
    SfAccordion,
    SfList
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
:root {
  --font-family--primary: "Josefin Sans";
  @include generate-color-variants(--_c-green-primary, #7ba393);
  @include assign-color-variants(--c-primary, --_c-green-primary);
  @include assign-color-variants(--c-secondary, --_c-green-secondary);
}
</style>
