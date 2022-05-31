<template>
  <div class="detailed-book__progress d-flex ai-center mb-1">
    <IconProgressCircle class="as-stretch mr-1" :percent="percentComplete" />
    <div>
      <p class="detailed-book__stats-text">
        {{ detailedBook.readPages }} / {{ detailedBook.totalPages }}
      </p>
      <p>{{ pagesReadToday }} pages read today</p>
    </div>
    <DefaultButton
      :text="updateProgressOpen ? 'Cancel' : 'Update'"
      flavor="tiny"
      class="ml-auto"
      :color="updateProgressOpen ? 'red' : 'yellow'"
      @click="toggleUpdateProgress"
    />
  </div>
  <div class="update-progress h-0" :class="{ open: updateProgressOpen }">
    <form class="update-progress__form p-1" @submit.prevent="updateProgress">
      <!-- END PAGE -->
      <p class="mb-1">I have now read</p>
      <div class="update-progress__page d-flex ai-center gap-1 mb-2">
        <NumberInput
          id="update-progress-end-at"
          v-model="endAt"
          :max="detailedBook.totalPages"
          class="update-progress__number mb-0"
        />
        <SegmentedControlInput
          v-model="endType"
          :options="progressTypeOptions"
          class="w-100"
        />
      </div>
      <!-- END PAGE -->
      <!-- DURATION -->
      <CheckboxInput
        id="update-progress-duration-toggle"
        v-model="logDuration"
        type="checkbox"
        label="Log duration"
        class="mb-2"
      />
      <div
        :class="{ 'open mb-1': logDuration }"
        class="update-progress__duration-container h-0"
      >
        <SegmentedControlInput
          v-model="durationType"
          :options="durationOptions"
          class="mb-1"
        />
        <div
          class="update-progress__time"
          :class="{ open: durationType === 'length' }"
        >
          <div class="update-progress__time-input d-grid">
            <NumberInput
              id="update-progress-duration"
              v-model="duration"
              label="Read for"
              class="update-progress__number mb-0"
            />
            <p class="update-progress__text as-end">minutes</p>
          </div>
        </div>
        <div
          :class="{ open: durationType === 'start-end' }"
          class="update-progress__duration-start-end"
        >
          <div class="d-flex ai-end mb-1">
            <DefaultInput
              id="update-progress-duration-start"
              v-model="durationStart"
              type="time"
              label="Start"
              class="update-progress__number mb-0 mr-1"
            />
            <IconButton
              class="mr-1"
              :color="blue"
              @click="setDurationStartOrEnd('durationStart')"
            />
          </div>
          <div class="d-flex ai-end">
            <DefaultInput
              id="update-progress-duration-end"
              v-model="durationEnd"
              type="time"
              label="End"
              class="update-progress__number mb-0 mr-1"
            />
            <IconButton
              class="mr-1"
              :color="blue"
              @click="setDurationStartOrEnd('durationEnd')"
            />
          </div>
        </div>
      </div>
      <div class="d-flex jc-space-between">
        <InlineButton
          text="Finished?"
          color="green"
          underline
          @click="finish"
        />
        <DefaultButton
          type="submit"
          text="Update"
          flavor="tiny"
          :disabled="updateProgressDisabled"
        />
      </div>
      <!-- DURATION -->
    </form>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
.book-page__stats-text {
  margin-bottom: calc(var(--spacing-size-1) / 4);
}
.book-page__stats-divide {
  margin: 0;
  transition: all 0.2s 0.3s ease-in-out;
}
.book-page__stats-divide.hidden {
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
</style>
