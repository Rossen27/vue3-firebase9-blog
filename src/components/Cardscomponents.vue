<template>
  <div class="card inline-block border border-gray-200 rounded-lg shadow-lg overflow-hidden">
    <div class="card__image h-64">
      <img class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
        alt="Office with a plant">
    </div>
    <div class="card__copy space-y-4 px-4 py-2">
      <div class="card__title text-2xl">Card Title</div>
      <div class="card__body text-base text-gray-600 pb-2">
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex at obcaecati delectus ea vitae maiores modi
          sit quos consectetur adipisci dicta aliquam, nisi a, nulla mollitia iste voluptatibus recusandae
          dolorem?</span>
      </div>
      <button class="w-full rounded-lg py-2 text-center bg-black text-white hover:bg-gray-800 hover:text-gray-100">
        Learn More
      </button>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card {
  width: 30rem;
}
</style>