import { reactive, computed } from '@nuxtjs/composition-api';

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isStoreModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isHamburguerMenuOpen: false
});

const useUiState = () => {
  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
  const toggleMobileMenu = () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  };

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isStoreModalOpen = computed(() => state.isStoreModalOpen);
  const toggleStoreModal = () =>{
    if (state.isStoreModalOpen) toggleMobileMenu();
    state.isStoreModalOpen = ! state.isStoreModalOpen;
  };

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen);
  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  const isHamburguerMenuOpen = computed(() => state.isHamburguerMenuOpen);
  const toggleHamburguerMenu = () => {
    state.isHamburguerMenuOpen = !state.isHamburguerMenuOpen;
  };
  const loginHamburguer = () => {
    state.isHamburguerMenuOpen = !state.isHamburguerMenuOpen;
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isStoreModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    isHamburguerMenuOpen,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleStoreModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleHamburguerMenu,
    loginHamburguer
  };
};

export default useUiState;
