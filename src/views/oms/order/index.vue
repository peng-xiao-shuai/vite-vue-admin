<template>
  <div>
      order
  </div>
</template>

<script>
export default {
    setup(){
        async function a(){
            await b()
        }

        function b() {
            return new Promise((resovle,reject)=>{
                console.log(2);

                resovle(11)
            })
        }

        a()
    }
}
</script>

<style>

</style>