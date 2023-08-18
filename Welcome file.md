---


---

<p><strong>Problem:</strong></p>
<p>You are tasked with creating a function that helps users find available time slots for appointments. The function should consider the user’s current time (in their timezone), the last free date (a Date object), and a list of existing appointments as input. The available time slots can be in two formats: exact times and ranges of time. Your goal is to determine available time slots that are at least 1 hour in the future from the current time of the user and before the last free date.</p>
<p>Write a function <code>validateSlots</code> with the following signature:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">interface</span> <span class="token class-name">BookedAppointments</span> <span class="token punctuation">{</span>
  appointmentTimeStart<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span> <span class="token comment">// Date | String</span>
  appointmentTimeEnd<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>   <span class="token comment">// Date | String</span>
  date<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>                 
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">validateSlots</span><span class="token punctuation">(</span>'
  userTimezone<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span>
  currentTime<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>
  lastFreeDate<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>
  bookedAppointmentTimes<span class="token punctuation">:</span> BookedAppointments<span class="token punctuation">[</span><span class="token punctuation">]</span>
  slots<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Date<span class="token punctuation">,</span> Date<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>Input:</strong></p>
<ul>
<li><code>userTimezone</code>: A string representing the user’s timezone (e.g., ‘America/New_York’).</li>
<li><code>currentTime</code>: The current time in the user’s timezone as a Date object.</li>
<li><code>lastFreeDate</code>: The last free date and time as a Date object.</li>
<li><code>bookedAppointmentTimes</code>: An array of tuples, where each tuple contains two Date objects representing the start and end times of existing appointments.</li>
<li><code>slots</code>: An array of objects, where each object represents an available time slot.</li>
</ul>
<p><strong>Output:</strong></p>
<ul>
<li>Return an array of available time slots, where each element is a tuple of two Date objects representing the start and end times of an available time slot.</li>
</ul>
<p><strong>Constraints:</strong></p>
<ul>
<li>The <code>currentTime</code> will be before the <code>lastFreeDate</code>.</li>
<li>The bookedAppointments array may be empty.</li>
<li>The user’s timezone will be valid.</li>
<li>The returned available time slots should be in the user’s timezone.</li>
</ul>
<p><strong>Example:</strong></p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> userTimezone <span class="token operator">=</span> <span class="token string">'America/New_York'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> currentTime <span class="token operator">=</span> <span class="token string">"Thu Jul 20 2023 08:05:00 GMT-0600"</span><span class="token punctuation">;</span> <span class="token comment">// July 20, 2023, 8:05 AM</span>
<span class="token keyword">const</span> lastFreeDate <span class="token operator">=</span> <span class="token string">"Thu Jul 20 2023 11:09:00 GMT-0600"</span><span class="token punctuation">;</span> <span class="token comment">// July 20, 2023, 11:09 AM</span>
<span class="token keyword">const</span> bookedAppointmentTimes<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
	<span class="token punctuation">{</span> appointmentTimeStart<span class="token punctuation">:</span> <span class="token string">'0100'</span><span class="token punctuation">,</span> appointmentTimeEnd<span class="token punctuation">:</span> <span class="token string">'2100'</span><span class="token punctuation">,</span> date<span class="token punctuation">:</span> <span class="token string">'07/20/2023'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">{</span> appointmentTimeStart<span class="token punctuation">:</span> <span class="token string">'2023-07-20T06:05:49-06:00'</span><span class="token punctuation">,</span> appointmentTimeEnd<span class="token punctuation">:</span> <span class="token string">'2023-07-20T07:50:49-06:00'</span><span class="token punctuation">,</span> date<span class="token punctuation">:</span> <span class="token string">'07/20/2023'</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token keyword">const</span> slots <span class="token operator">=</span> <span class="token punctuation">[</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815007'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'06:00 - 08:00 (1)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815007'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/19/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815008'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'08:00 - 10:00 (5)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815008'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/19/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815009'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'10:00 - 12:00 (12)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815009'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/19/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815010'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'12:00 - 14:00 (12)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815010'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/19/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815011'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'14:00 - 16:00 (9)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815011'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/19/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815025'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'06:00 - 08:00 (9)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815025'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/20/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815026'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'08:00 - 10:00 (17)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815026'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/20/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815027'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'10:00 - 12:00 (16)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815027'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/20/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815028'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'12:00 - 14:00 (15)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815028'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/20/2023'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
key<span class="token punctuation">:</span>  <span class="token string">'815029'</span><span class="token punctuation">,</span>
text<span class="token punctuation">:</span>  <span class="token string">'21:00 - 23:00 (15)'</span><span class="token punctuation">,</span>
value<span class="token punctuation">:</span>  <span class="token string">'815029'</span><span class="token punctuation">,</span>
ContainerNo<span class="token punctuation">:</span>  <span class="token string">'TGBU5454043'</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span>  <span class="token string">'07/20/2023'</span>
<span class="token punctuation">}</span>
<span class="token punctuation">]</span>

bookedAppointmentTimes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>rAT<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> availableSlots <span class="token operator">=</span> <span class="token function">validateSlots</span><span class="token punctuation">(</span>userTimezone<span class="token punctuation">,</span> currentTime<span class="token punctuation">,</span> lastFreeDate<span class="token punctuation">,</span> rAT<span class="token punctuation">,</span> slots<span class="token punctuation">)</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> availableSlots<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>In this example, the function should output available time slots that are at least 1 hour long and between the <code>currentTime</code> and <code>lastFreeDate</code>, considering the existing appointments and the provided slot data.</p>

Make sure to use momentjs for handling dates and timezones.