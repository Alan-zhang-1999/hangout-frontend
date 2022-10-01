<template>
    <form @submit.prevent = "">
        <div>
            <label for="">Group Name</label>
            <input type="text"/>
            <p>(no more than 10 words)</p>
        </div>
        <div>
            <label for="">Location</label>
            <input type="text"/>
        </div>
        <div>
            <label for="">Topic</label>
            <input type="text"/>
            <p>(topics that describe your groups interests)</p>
        </div>
        <div>
            <label for="">Describe your group</label>
            <textarea row = "10" col = "20"/> 
            <p>(At least 50 words)</p>
        </div>
        <div>
            <label for="">Group Size:</label>
            <input type="radio" id="small" name="group-size" value="1-4">
                 <label for="small">1-4 people</label>
                 <input type="radio" id="medium" name="group-size" value="5-10">
                 <label for="medium">5-10 people</label>
                 <input type="radio" id="large" name="group-size" value="over10">
                 <label for="large">more than 10 people</label>
        </div>
        <div>
            <label for="">Photos</label>
            <input type="text"/>
        </div>
        <br>
        <div>
            <button >Login in</button>
        </div>
    </form>
</template>