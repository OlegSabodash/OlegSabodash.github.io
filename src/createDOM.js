
class DOM {
    constructor(obj) {
      this.serverRequest = obj;
      this.buttonSearch = null;
      this.input = null;
      this.countVideoInWindow = 0;
      this.inputValue = '';
      this.staticElements = {};
      this.lastButton = null;
      this.countButton = 0;
      this.count = 0;
      this.spaceXVideo = null;
      this.countClick = 0;
      this.buttonActive = null;
    }
  
    start() {
      this.buttonSearch = document.querySelector('#searchIcon');
      this.input = document.querySelector('#inputSearch');
  
  
      this.addHandler();
    }
  
    addHandler() {
      const that = this;
      that.createElementsStatic();
      that.setSliserWidth(window.innerWidth);
      document.onkeyup = function f(e) {
        if (e.keyCode === 13) {
          that.buttonSearch.click();
        }
      };
      this.buttonSearch.addEventListener('click', () => {
        if (that.input.value !== '' && that.input.value !== that.inputValue) {
          that.inputValue = that.input.value;
          that.serverRequest.getVideoId(that.input.value);
  
  
          that.staticElements.divSlides.innerHTML = '';
          that.staticElements.divButtons.innerHTML = '';
          that.countButton = 0;
          that.count = 0;
          that.countClick = 0;
          that.buttonActive = null;
          that.countVideoInWindow = 0;
          that.spaceXVideo = null;
  
          that.createElements(that);
  
          that.resizeEvent();
        }
      });
    }
  
    createElementsStatic() {
      const dom = this.staticElements;
  
      dom.divSlider = document.querySelector('#slider');
      dom.divWrapperSlides = document.createElement('div');
      dom.divSlides = document.createElement('div');
      dom.divButtons = document.createElement('div');
  
      dom.divWrapperSlides.classList.add('wrapperSlides');
      dom.divSlider.appendChild(dom.divWrapperSlides);
      dom.divSlides.id = 'slides';
      dom.divWrapperSlides.appendChild(dom.divSlides);
      dom.divButtons.classList.add('buttons');
      dom.divButtonsSwitch = document.createElement('div');
  
      dom.divWrapperButtons = document.createElement('div');
      dom.divWrapperButtons.appendChild(dom.divButtons);
  
      dom.divWrapperButtons.classList.add('wrapperButton');
  
      dom.buttonPrev = document.createElement('button');
      dom.buttonNext = document.createElement('button');
      dom.buttonNext.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true"></i>';
      dom.buttonPrev.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
      dom.buttonNext.classList.add('buttonNext');
      dom.buttonPrev.classList.add('buttonPrev');
      dom.divButtonsSwitch.appendChild(dom.divWrapperButtons);
      dom.divButtonsSwitch.appendChild(dom.buttonPrev);
      dom.divButtonsSwitch.appendChild(dom.buttonNext);
      dom.divSlider.appendChild(dom.divButtonsSwitch);
      dom.divButtonsSwitch.classList.add('divButtonsSwitch');
  
      const that = this;
  
      function handler(e) {
        e.target.classList.add('hint');
        if (e.target === dom.buttonPrev) {
          if (e.type === 'mouseover') {
            e.target.innerHTML = +that.buttonActive.getAttribute('data-slide') - 1;
          }
          if (e.type === 'mouseout') {
            e.target.classList.remove('hint');
            dom.buttonPrev.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
          }
        }
  
        if (e.target === dom.buttonNext) {
          if (e.type === 'mouseover') {
            e.target.innerHTML = +that.buttonActive.getAttribute('data-slide') + 1;
          }
          if (e.type === 'mouseout') {
            e.target.classList.remove('hint');
            e.target.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true"></i>';
          }
        }
      }
  
      let resultLeft = 0;
      dom.buttonNext.onmouseover = handler;
      dom.buttonPrev.onmouseover = handler;
      dom.buttonNext.onmouseout = handler;
      dom.buttonPrev.onmouseout = handler;
  
      this.staticElements.buttonPrev.addEventListener('click', () => {
        const button = that.staticElements.divButtons.querySelector('button.slideButtons:nth-child(' + (+that.buttonActive.getAttribute('data-slide') - 1) + ')');
        if (button) {
          if (parseInt(window.getComputedStyle(that.staticElements.divButtons).getPropertyValue('left'), 10) < 0) {
            that.countClick += 1;
            resultLeft = 40 * that.countClick;
            that.staticElements.divButtons.style.left = resultLeft + 'px';
          }
          that.staticElements.divButtons.style.transition = 'left 0.2s';
          button.click();
          dom.buttonPrev.innerHTML = +that.buttonActive.getAttribute('data-slide') - 1;
        }
      });
  
      this.staticElements.buttonNext.addEventListener('click', () => {
        dom.buttonPrev.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
        const button = that.staticElements.divButtons.querySelector('button.slideButtons:nth-child(' + ( 1 + +that.buttonActive.getAttribute('data-slide')) + ')');
        if (button) {
          that.countClick -= 1;
          resultLeft = 40 * that.countClick;
          that.staticElements.divButtons.style.left = resultLeft + 'px';
        }
        that.staticElements.divButtons.style.transition = 'left 0.2s';
  
        button.click();
        dom.buttonNext.innerHTML = +that.buttonActive.getAttribute('data-slide') + 1;
      });
    }

    setSliserWidth(number) {
      const that = this;
      function f(one, two, three) {
        that.staticElements.buttonNext.style.left = one;
        that.staticElements.buttonPrev.style.left = two;
        that.staticElements.divWrapperButtons.style.width = three;
      }
      if (number >= 1140) {
        this.staticElements.divSlider.style.width = '1200px';
        f('490px', '80px', '60%');
      }
      if (number > 930 && number < 1140) {
        this.staticElements.divSlider.style.width = '888px';
        f('310px', '100px', '36%');
      }
  
      if (number > 660 && number <= 930) {
        this.staticElements.divSlider.style.width = '576px';
        f('210px', '45px', '42%');
      }
  
      if (number > 0 && number <= 660) {
        this.staticElements.divSlider.style.width = '264px';
        f('90px', '10px', '30%');
      }
    }

    createElements(that) {
      for (let i = 0; i !== 12; i += 1) {
        const obj = this.serverRequest.infForDOM[i];
        const divVideoSlide = document.createElement('div');
        divVideoSlide.classList.add('videoSlide');
        this.staticElements.divSlides.appendChild(divVideoSlide);
        const figure = document.createElement('figure');
        divVideoSlide.appendChild(figure);
        const img = document.createElement('img');
        img.src = obj.picture;
        figure.appendChild(img);
        const divTitle = document.createElement('div');
        divTitle.classList.add('title');
        divVideoSlide.appendChild(divTitle);
        const p = document.createElement('p');
        divTitle.appendChild(p);
        const a = document.createElement('a');
        a.innerText = obj.title;
        p.appendChild(a);
        a.href = 'https://www.youtube.com/watch?v=' + obj.videoId;
        a.target = '_blank';
        const table = document.createElement('table');
        table.classList.add('infVideo');
        divVideoSlide.appendChild(table);
  
        const trOne = document.createElement('tr');
        table.appendChild(trOne);
        trOne.innerHTML = '<th><i class="fa fa-male" aria-hidden="true"></i></th>';
        const thOneTwo = document.createElement('th');
        thOneTwo.innerHTML = obj.channel;
        trOne.appendChild(thOneTwo);
  
        const trTwo = document.createElement('tr');
        table.appendChild(trTwo);
        trTwo.innerHTML = '<th><i class="fa fa-calendar" aria-hidden="true"></i></th>';
        const thTwoTwo = document.createElement('th');
        thTwoTwo.innerHTML = obj.dateCreate;
        trTwo.appendChild(thTwoTwo);
  
        const trThree = document.createElement('tr');
        table.appendChild(trThree);
        trThree.innerHTML = '<th><i class="fa fa-eye" aria-hidden="true"></i></th>';
        const thTwoThree = document.createElement('th');
        thTwoThree.innerHTML = obj.view;
        trThree.appendChild(thTwoThree);
  
        const trFour = document.createElement('tr');
        trFour.innerHTML = '<th colspan="2"><i class="fa fa-thumbs-up" aria-hidden="true"></i> <span class="like">39056</span><i class="fa fa-thumbs-down" aria-hidden="true"></i><span>1926</span></th>';
        const spans = trFour.getElementsByTagName('span');
        spans[0].innerHTML = obj.like;
        spans[1].innerHTML = obj.dislike;
        table.appendChild(trFour);
  
        const divDescription = document.createElement('div');
        divDescription.classList.add('description');
        divVideoSlide.appendChild(divDescription);
        const pDescription = document.createElement('p');
        pDescription.innerHTML = obj.description;
        divDescription.appendChild(pDescription);
  
        const parameter = this.staticElements.divWrapperSlides.getBoundingClientRect().right;
        if (parameter > divVideoSlide.getBoundingClientRect().right) {
          this.countVideoInWindow += 1;
        }
      }
  
  
      this.count += 12 / this.countVideoInWindow;

      this.createButtons(that);
      this.onMouseEvent();
      this.lastButton = this.staticElements.divButtons.querySelector('button:last-child');
    }

    createButtons(that) {
      for (let i = this.countButton; i < this.count; i += 1) {
        const button = document.createElement('button');
        button.setAttribute('data-slide', i + 1);
        this.staticElements.divButtons.appendChild(button);
        button.classList.add('slideButtons');
        const spanNumber = document.createElement('span');
        spanNumber.innerHTML = i + 1;
        button.appendChild(spanNumber);
  
        button.addEventListener('click', function func() {
          const self = that;
          const buttonsClick = that.staticElements.divButtons.querySelectorAll('button');
          self.buttonActive = this;
          for (let y = 0; y < buttonsClick.length; y += 1) {
            buttonsClick[y].style.backgroundColor = 'white';
          }
  
  
          this.style.backgroundColor = 'red';
  
  
          const divXone = that.staticElements.divSlides.querySelector('#slides div.videoSlide:nth-child(' + (this.getAttribute('data-slide') * that.countVideoInWindow - (that.countVideoInWindow - 1)) + ')');
          const divXtwo = that.staticElements.divSlides.querySelector('#slides div.videoSlide:nth-child(1)');
          self.staticElements.divSlides.style.left = -divXone.getBoundingClientRect().left + divXtwo.getBoundingClientRect().left + 'px';
          const thatOne = this;
          self.staticElements.divSlides.style.transition = 'left 1s';
          self.spaceXVideo = Math.floor(that.staticElements.divSlides.querySelector('#slides div.videoSlide:nth-child(' + that.countVideoInWindow + ')').getBoundingClientRect().right - divXtwo.getBoundingClientRect().left) + 47;
          setTimeout(() => {
            if (thatOne === buttonsClick[buttonsClick.length - 1]) {
              that.serverRequest.getVideoId(that.input.value);
              that.createElements(that);
            }
          }, 1);
        });
        this.countButton += 1;
      }
  
      const countVideo = that.staticElements.divSlides.querySelectorAll('#slides div.videoSlide');
      let numbButton = 0;
      for (let h = 0; h < countVideo.length; h += 1) {
        const parametr = countVideo[h].getBoundingClientRect().left;
        if (parametr === that.staticElements.divWrapperSlides.getBoundingClientRect().left) {
          numbButton = Math.floor(h / this.countVideoInWindow) + 1;
          const buttonOnClick = this.staticElements.divButtons.querySelector('button:nth-child(' + numbButton + ')');
          buttonOnClick.click();
          break;
        }
      }
    }
    
    onMouseEvent() {
      const that = this;
      let eventObj = null;
      let left = 0;
      function handler(event) {
        if (parseInt(that.staticElements.divSlides.style.left, 10) >= 10 && event.screenX > 0) {
          that.staticElements.divSlides.style.left = '9px';
        }
  
        if (parseInt(that.staticElements.divSlides.style.left, 10) < 100) {
        
          that.staticElements.divSlides.style.transition = 'left 0s';
          that.staticElements.divSlides.style.left = (event.screenX - eventObj.screenX) / 16 + parseInt(that.staticElements.divSlides.style.left, 10) + 'px';
  
          left = (parseInt(that.staticElements.divSlides.style.left, 10) * (-1) / that.spaceXVideo);
          if (Math.floor(left) + 0.3 > left && Math.floor(left) < left) {
            if (Math.floor(left) == that.buttonActive.getAttribute('data-slide')) {
              that.staticElements.buttonNext.click();
            }
            if (Math.floor(left) == that.buttonActive.getAttribute('data-slide') - 2) {
              that.staticElements.buttonPrev.click();
            }
          }
        }
      }
  
      this.staticElements.divSlides.addEventListener('mousedown', (e) => {
        eventObj = e;
        that.staticElements.divSlides.addEventListener('mousemove', handler);
      });
  
      this.staticElements.divSlides.addEventListener('mouseup', () => {
        that.staticElements.divSlides.removeEventListener('mousemove', handler);
      });
    }
    
    
    resizeEvent() {
      const that = this;
      function changeSpaceForButton(numb) {
        function f(one, two, three) {
          that.staticElements.buttonNext.style.left = one;
          that.staticElements.buttonPrev.style.left = two;
          that.staticElements.divWrapperButtons.style.width = three;
        }
  
        if (numb === 4) {
          f('490px', '80px', '60%');
        }
  
        if (numb === 3) {
          f('310px', '100px', '36%');
        }
  
        if (numb === 2) {
          f('210px', '45px', '42%');
        }
  
        if (numb === 1) {
          f('90px', '10px', '30%');
        }
      }
      let resizeWindow = window.innerWidth;
      let changeWindow = null;
      window.addEventListener('resize', () => {
        if (resizeWindow > window.innerWidth) {
          resizeWindow = window.innerWidth;
          changeWindow = '-';
        }
  
        if (resizeWindow < window.innerWidth) {
          resizeWindow = window.innerWidth;
          changeWindow = '+';
        }
        if (window.innerWidth < 100 + parseInt(that.staticElements.divSlider.style.width, 10) && window.innerWidth > -100 + parseInt(that.staticElements.divSlider.style.width, 10) && changeWindow === '-') {
          that.staticElements.divSlider.style.width = parseInt(that.staticElements.divSlider.style.width, 10) - 312 + 'px';
          that.countVideoInWindow -= 1;
          that.staticElements.divButtons.innerHTML = '';
          that.count = 12 * that.serverRequest.countnerRequest / that.countVideoInWindow;
          that.countButton = 0;
  
          that.createButtons(that);
  
          changeSpaceForButton(that.countVideoInWindow);
        }
  
        if (window.innerWidth < 100 + parseInt(that.staticElements.divSlider.style.width, 10) + 312 && window.innerWidth > -100 + parseInt(that.staticElements.divSlider.style.width, 10) + 312 && changeWindow === '+') {
          if (that.countVideoInWindow < 4) {
            that.staticElements.divSlider.style.width = parseInt(that.staticElements.divSlider.style.width, 10) + 312 + 'px';
  
            that.countVideoInWindow += 1;
            that.staticElements.divButtons.innerHTML = '';
            that.count = 12 * that.serverRequest.countnerRequest / that.countVideoInWindow;
            that.countButton = 0;
  
            that.createButtons(that);
            changeSpaceForButton(that.countVideoInWindow);
          }
        }
      });
    }
  }
  
  
  export default DOM;
  