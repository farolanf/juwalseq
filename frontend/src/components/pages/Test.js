import React from 'react'
import Cropper from 'react-cropper'

const Test = () => {
  return (
    <div className='test-cropper border-1 border-blue border-solid'>
      <Cropper src={dataURL} viewMode={0} preview='.test-cropper-preview' minContainerHeight={400} />
      <div className='test-cropper-preview border-1 border-green border-solid overflow-hidden' style={{ width: 200, height: 200 }} />
    </div>
  )
}

export default Test

const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExIWFRUVFRgXFhcVFRYYFhIXFxUYFxcXGBUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy8mICYtLy8tLS0uLS0tLy0rLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tKy0tLS0tLS0tLS0tLf/AABEIAPQAzwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYHAf/EAEIQAAIBAgIFCAUMAQIHAAAAAAABAgMRBCESMUFRYQUGE3GBkaHRByIyUrEUI0JTYnKCkqLB4fDxFUMWF2OywtLi/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAIDAQQFBv/EACoRAAMAAgIBBAIABgMAAAAAAAABAgMRBBIhBTFBUWGRIjJSobHhExQV/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEfGY2nSjpVKkYLfKSS8Tmcd6RMDTdlKdXjTh6vfJq/ZchWSZ/meiLuZ92dcDjML6ScHJ2kqsOLgml+Vt+B0/J3KdGutKlUjNbdF5rrWtdonJFfyvYm5r2ZMABMkAAAAAAAAAAAAAAAAAAAAAAAAAAAasTiIwjKc5KMYpuUm7KKSu22eU84/SHXqSccM+ipalJr5yfF39hbks/grn0t8oSUKOHjKyqOU6iV/WUNHRT4Xd/wAKPNOjOXzeVU10k1M+Vp9UfMTiJTlpTk5SeuUm5PveZqubNGxrkcx1tmm2LljybjZU5qUJOElqlF2a7vgV/RvXs4/3Mypw2ssx11ewt7PU+ReetRJKtFVF70bRl2rU33FziOemGjHStUb93RSa623bxPHIYmUdTt2v9mR61eUtcrnR/wC9pGyuRSR2nK3POvicRSo030cZVYQUYya0nOWgnOa+9syWvM6vB8hY6DusRGL+/Umn1qUbNnn3o+5J6fHU7p6NG1aT4wa0Ff7+j3M9wRZg3mXei7Du90zGknZaTTlZXsrJvbZPUjMA3jYAAAAAAAAAAAAAAABE5Wx0KFGpWm0o04OTu7LJar2evVqJZpxeHjUhKnNXjOLjJb1JWfgGDjuYnPWrjas6dSjGnaCnBxbu1pWaaeu1455a9R255J6MsI6WOdOXtUqeIpvi41KSbXXo3PWKlRRTbaSWtt2SXF7CjBkdztk8kpPweZelx2r0H/05r9SOIhFvUm3uR6PzvpfL9B0KdSrGjpevFWhNy0coylbSto61vOExlSpSeg6UqT3NNPtucjmp1lbXt9/Bzs0/xNmh4OyvNpcNbZGnJL2Y9rd35Iyk77WYaLNPWihnzSe02xkjCMT6k0YC8H2UNxsoYCpOSjCLcnklvJvJWFqVpqnSg5yfurVxk3lFcWer82ObEMLFSdpVmvWlsjwjfO3Hbw1G5xuLWV7+C3HidsczObiwdGzd6s7SqS2XtlGP2Vn3s6EA7sSpSlG/MqVpAAEjIAAAAAAANWIrxhFznJRildt7ADaaMRi4Q9ucY/eaR5/zj5+ZuFF2Wq69qXFv6K4LPicfX5ZlLNtt+HWaeTmxL0vJW7+j2Gtzjw0b/Op23KT8bWIGI55UF7MZS7kjyZY+eVmPlEpOzfUal+pa9kR7s9T/AOMU9VOK66n/AMmC55J5fNp8ZS8jzJOW29+JJpRW0136pZjszpMDWhTxc8Z0sbzc3oWeinNRTz1vON7FpTxlGrLSxVV10neME4wpR3fNX9Z8ZNnFKm9G+pPYZ9HdXT1Wy236ipeoteNfkk7p+56lS5dpJJRhKyWSSjZLgkz5icTha8bVaemvtQTt1PYea0aslqes2UKs4vXnvTLf/XXs0Y7M6bFc0+T5u8Okp/dd4rsdzXDmHhJeziJ9yT7LlXR5TqbW3sz2k/D8pJu17cP2JRyuNb8yv8EdT9En/lnQ+vq90PIn4T0e4KDvJTqcJzdr9UbX7bmXJ/LTi9F5rd5P9jpcPXjOOlF3TOjhx8evMyiUxjfwYYLA06UdClCMIrZGKS8NbJABuJaLgAAAAAAAAACNyji40qc6svZgm3x3JcW8u082lzoxEm26j130U2lG+xaLWooz8icWtmG9Hp9aqoxcpNJJXbepJHk3PHnLUxMtCF40k/VW/wC0+O7cbsTyw6kHGcqmi9dqss+yVyqeGot5SqLrUXbuaObyecrXWXr7It7KWOHexeObM/k+V3r4Ft8hjrVXvpeVQ+/6Y3l0kWuMZr4NnNrIvshoqqNC7Mo07PIt6fI07e1T75r/AMTKnyRPfHhm/wD1Nesi+1+0OjIUY3zN8dX7d24nLkuSVsu82/6NUbVkrfeKO22Z6sr6N7cG8+wk0qOlnZZZvYTFyPUyyXeiRDkqqrrRy61f+5kXv5RnqyBKlndCFJ6kW0MFNZNPLhmu1az58ltnmuxlDryZ6sqtDNX2GXRXe4sZUov6Svfj5HypRWWp9V2jHZ7MdSJCs9utbS55F5UlTlfWtq95b+sgUsE5SSjrbstmeraWdHm1iE72jw9bw6jqcPJyW1US3r6MdWjsqFVSipRd01dGwrORcJUpxana2tJNvRe3ZqLM9bjp1KbWmWoAAmAAAAAADi/SRjmoU6K+k9OXFR9ld+f4TgpqyL7nhiulxc7aoeovwLP9TkUFS91frOJzMna2VUfG9l+vhwM4swVPb/esztq6jl5GRJEI/wB6yXQWzZfNkeMeNyTRV9m81beiSJlFM3wp3Zqo3JkFZreab9y1GynDO3iWWHwuVyPSWV/7Yn4V3yLsKW/JMzp0Vckxp32GUIkmNM6MY/GhogyoI+Sp5ZrwJ86dyPUgUZMOjJXyw0NxrdCO7+7SVNGnaajx6fsCNGklLJb/APJ1WGqaUU968dpzd81u8y65Jn6rW5/E9F6PetwQZPAB3jAAAAAAAAABz/KPNHDVW5JSpybbbg8m3m24yuu6xwHOPk+OHrukpOdkneyTV1e1uprvPXmeS86ZOWMqy+1b8qUV/wBqOfzcONR215IWiqdWGbzXYZRrU2vbW7NP9zRWhnbw4mvoc8zz+WUQ2WeHlC2UovtRY4bR13XeighS1WJVPDmrUpEkdHRp3zTXYyRGOebOapYXgTKOCT2GvUosTOlpIn4KO05engyVRwuet95GMqlpkzraeuxLijmKGGttfey5wtONtWZ0ePyNvWv7/wCjJOZqq2M4U1uMtBbl3G88btGSsmYVLWLRxW5dxg4GheBy/cyVM4SepPUS8HKUc8l1m+rFGvRLcFvFW5ZhySFj97T6r/yT0UNRZl8eg4Oesqfb4K2tAAG+YAAAAAABz3LPNKjWk6kW6c3rcc4ye9x39TR0IIXE2tUho8V5SpdFVnTbzhJwbSydna6NGlDL1lfiyw52w0cVXT+sb/Mrr4lHKOvgjzfJwpU0in5LSnTWxrsJtGOWo56Ebm+F1azfeznVj/JlM6KESXTRztKrUX05d9ybRxVT332peRRUfkmmX9JEmmiip4yrvT7CZRxlTao+PmUUkWJnQUETaesoKONn7q7ywoY+WvQ/V/BdjywnrZMvabM7ldRxrf0fH+CT0/DxR045E9fDMm5mDEZ3MbPcV3fb2JGMmYOJnKL3HxxZBJ/QIsn6y6/IvCmnQ2tm7D4mTmo3bu9vBHa9OzKF1a8tlNFoADtEQAAAAADGckk28ks2U9TnThF/u34xhUku9RZcs8ax0HRq1KautCcorPYm7eFjV5WasSTlEaejXzxx8KmKqTp3lGWi02mvopNWa3opumzuXaxr/wA2fxMo4pbYwf4I+R57PnVU3RDSZUUpXfWSYMsVVhr6On+SPkbYzpv/AG4flt8DTu4CRCpk2mzfDo/q4+PmSIRh7i/V5mvbh/JNIwotE+kka4xhsiu+XmTKUY7l3vzNapTfiixCnAmUkfKVKO7xfmSadGO74mYw/lEz7RyJtKZohSW7xZujTX9ubMY6n5RnZvjM2RkR9A+pcS5bXyZ2bpTQUiNUZHlPi+8uns2YbJNWZ95MV5t7l8WSsHhI6EdKKbau7rPPOxJp0Yx9lJX3Kx3eLwaildMrb2bAAdUiAAAAAADzH0h4Po8T0lsqsU/xRSi/BQ7z045rn9gFUwrldJ0mpJu9nscct9+9Io5Md8bRGltHljl8T4qpHqqp9XPr0W/gaVJp5p/A8zkjbKSyVXMkU6hWQmSaNQ1qgymWlOoS6NS5WU5kmlI1LksTLSnMlUahXUZkunI1KWixMtaEyXRqFZRkSIzK1kqS1FnCqbozK2MjcqpdPJM6JzmOlIaqHxzLZzjRuqVDHDw05xjs29S1kOdUk8jTUqsW3a12r6nlbXvz+J1eBc3kSf2V0dMgAewIAAAAAAAAAA116SnFxkrqSaa3pqzNgAPJuU6E8NWlSbdlnF+9B30X4NdaZso417ztud/IfyileK+dhdw+1vg3x2cUjzCjVadnk07O+tNZWa2M87zuO8Vbn2ZX7M6D5TwT64x8jNVo+5DtjHyKmNU3Kocmstr5JplpB0/qqf5Ebowp/U0+4rKdQkQqEP8Amokixp0qX1UfHzJEKFL6td7IVGoSoVDDy/hfpEiVGhTX0P1M2xw1P3f1S8yNGoblVHeflL9Ikb1Rh7v6peZ9VKHu+LNCqmyMzHaf6V+kNm1Qj7nizLRgvoI09IY1KpZFL6X6Q2bnKK1QRlh6bqS0dm3qItO7aSzOgwWGUI227X/dh2OBxnlfal4INm9I+gHoSIAAAAAAAAAAAAOD5+c2m74qjG711YLb9uK3pa1t16737wq+WeUeiWWsqzY5yT1ow1s8iw9a+0mQqGnl9R03UglBt3lFZRk96S1PwIGGxye3+DzPK4VY3+Psh5Re03xJVORT0axMp1b/AMHNuNEky4pTN8ZlZTqm2NQqaLEyyVU2QqlZGZvhMwvJnZZRqGfSEGNQOoTmGxsmusI3k7LPgtvYfMFhJ1H6qy3vUu39kdNgMBGmt8trf7bkdnhenVke68Ijs18m4DQWlL2n+ngieAekiJiesmAACYAAAAAAAAAAAABFxuBjUVpIlAA4/lHmZGepnMY70bzveDae9Hq4K3iTMnik+aOPp6rTS3pp96EcDjI+1h5dadz2s+aKNS/T8N+6I6R41TqVo66NRfhJEcS9sZrrjLyPXNBbkfOijuXca1ej4n8saPKKeK+zL8kn8ESqbqP2aNR/ht8bHpqpx3LuMkhPo2Je7ZnR59Q5PxUtVJxX2n5F3yZyBNNOpZ8NndtOnBt4+Bhx+UgYwikrLLqMgDdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=='
