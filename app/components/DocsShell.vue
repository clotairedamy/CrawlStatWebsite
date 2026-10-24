<template>
  <div class="container docs">
    <aside class="side">
      <DocsNav />
    </aside>
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.docs {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 72px;
  padding-top: 48px;
  padding-bottom: 120px;
}

.side {
  position: sticky;
  top: 108px;
  align-self: start;
  max-height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 4px;
  scrollbar-width: thin;
}

.main {
  max-width: 780px;
}

@media (max-width: 900px) {
  .docs {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .side {
    position: static;
    max-height: none;
    order: 2;
    padding-top: 40px;
    border-top: 1px solid var(--line);
  }
}
</style>
