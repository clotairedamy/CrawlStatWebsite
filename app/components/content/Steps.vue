<template>
  <div class="steps"><slot /></div>
</template>

<style scoped>
.steps :deep(ol) {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
  counter-reset: step;
}

.steps :deep(ol > li) {
  position: relative;
  counter-increment: step;
  padding: 20px 24px 20px 76px;
  border-radius: 18px;
  background: var(--bg);
  box-shadow: var(--raised-sm);
  margin: 0;
}

.steps :deep(ol > li::before) {
  content: counter(step);
  position: absolute;
  left: 22px;
  top: 18px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.86rem;
  font-weight: 500;
  color: #2a1c10;
  background: var(--copper-grad);
  box-shadow: 0 0 14px rgba(227, 173, 123, 0.3);
}
</style>
