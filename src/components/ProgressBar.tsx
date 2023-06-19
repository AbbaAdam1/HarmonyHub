import "../styles/customize-progress-bar.css"

const ProgressBar = () => {
  return (
    <div class="flex items-center gap-10 w-full">
      <span class="text-red-500">00:00</span>
      <input type="range" class="range-slider w-full" style={{ '--range-progress': '25%' }} />
      <span class="text-gray-700 text-sm leading-11">03:34</span>
    </div>
  );
};

export default ProgressBar;